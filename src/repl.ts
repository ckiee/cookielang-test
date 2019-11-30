import readline from "readline";
import Lexer from "./lexer";
import Parser from "./parsing";
import TokenStream from "./tokenStream";
import Node from "./parsing/node";
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
const shouldParse =
    process.argv.includes("--parse") || process.argv.includes("-p");
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

        if (shouldParse) {
            const parser = new Parser(new TokenStream(out));
            const nodes = [] as Node[];
            while (parser.ts.hasNext()) {
                nodes.push(parser.parseTopLevel())
                console.log(nodes[nodes.length - 1]);
            }
        }
    }
}
repl();
