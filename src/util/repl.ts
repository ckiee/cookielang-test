import readline from "readline";
import Lexer from "../lexing/lexer";
import Parser from "../parsing";
import TokenStream from "./tokenStream";
import Node, {NodeType} from "../parsing/node";
import CCodeGenPass from "../passes/ccodegenpass";
import Function from "../parsing/function";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function question(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (data) => {
            resolve(data);
        });
    });
}

function capitalizeFirstLetter(string: string) {
    // Thanks StackOverflow https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript#1026087
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const ignoreWhitespace =
    process.argv.includes("--ignore-whitespace") || process.argv.includes("-i");
let shouldParse =
    process.argv.includes("--parse") || process.argv.includes("-p");
const shouldCCodeGen =
    process.argv.includes("--codegen") || process.argv.includes("-c");
async function repl() {
    while (true) {
        const answer = await question("> ");
        const out = new Lexer(answer, ignoreWhitespace).lex();
        if (process.argv.includes("-ts")) {
            // TokenStream mode
            console.log(
                `new TokenStream([${out.map(
                    (t) =>
                        `new Token(TokenType.${capitalizeFirstLetter(
                            t.type
                        )}, "${t.match}")`
                )}])`
            );
        } else {
            console.log(out);
        }

        const nodes: Node[] = [];

        // Parse must be true if code generating.
        if (shouldCCodeGen) {
            shouldParse = true;
        }

        if (shouldParse) {
            const parser = new Parser(new TokenStream(out));
            while (parser.ts.hasNext()) {
                nodes.push(parser.parseTopLevel())
                console.log(nodes[nodes.length - 1]);
            }
        }

        if (shouldCCodeGen) {
            const ccodegenPass = new CCodeGenPass();

            if (nodes.length == 0 || nodes[0].type !== NodeType.FUNCTION) {
                throw new Error("No functions were parsed -- cannot codegen");
            }

            for (const fun of nodes) {
                const func = <Function>fun;
                ccodegenPass.visitFunction(func);
                console.log(`--- output of function '${func.proto.name}' ---`);
                console.log(ccodegenPass.valueStack.pop());
            }
        }
    }
}
repl();
