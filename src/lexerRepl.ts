import readline from "readline";
import Lexer from "./lexer";
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

function capitalizeFirstLetter(string: string) { // Thanks StackOverflow https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript#1026087
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function repl() {
    while (true) {
        const answer = await question("> ");
        const out = new Lexer(
            answer,
            process.argv.includes("--ignore-whitespace") ||
                process.argv.includes("-i")
        ).lex();
        if (process.argv.includes("-ts")) {
            // TokenStream mode
            console.log(
                `new TokenStream([${out.map(
                    (t) => `new Token(TokenType.${capitalizeFirstLetter(t.type)}, "${t.match}")`
                )}])`
            );
        } else {
            console.log(out);
        }
    }
}
repl();
