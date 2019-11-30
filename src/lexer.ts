import TokenType, { getTokenTypeRegexp } from "./tokenType";

export class Token {
    type: TokenType;
    match: string;
    constructor(type: TokenType, match: string) {
        this.type = type;
        this.match = match;
    }
    expectType(tt: TokenType): Token {
        if (tt == this.type) return this;
        else throw new Error(`expected token ${tt} but got ${this.type}`);
    }
}

export default class Lexer {
    data: string;
    i: number = 0;
    debug: boolean = false;
    tokens: Token[] = [];
    ignoreWhitespace: boolean;
    // TODO: Turn ignoreWhitespace into ignoreTokens: string (TokenType)[]
    constructor(data: string, ignoreWhitespace: boolean = false) {
        this.data = data;
        this.ignoreWhitespace = ignoreWhitespace;
    }
    debugLog(...args: any) {
        if (this.debug) {
            console.log(...args);
        }
    }
    lex() {
        while (this.data.length > this.i) {
            const char = this.data[this.i];
            const unprocessed = this.data.substring(this.i);

            this.debugLog(this.i, char);
            let lexed = false;
            for (const k of Object.values(TokenType)) {
                const v = getTokenTypeRegexp(k);
                const result = v.exec(unprocessed);
                if (!result) continue;
                const match = result[0];
                this.i += match.length - 1;
                if (k !== "whitespace" || !this.ignoreWhitespace) {
                    this.tokens.push(new Token(k, match));
                }
                lexed = true;
                break;
            }
            if (!lexed) {
                console.error(`Lex Error, unknown token at position ${this.i}`);
                break;
            }
            this.debugLog("");
            this.i++;
        }
        return this.tokens;
    }
}
