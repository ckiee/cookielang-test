import TokenStream from "../tokenStream";
import Int from "./int";
import BitSize from "../bitsize";
import Type from "./type";
import TokenType from "../tokenType";

export default class Parser {
    ts: TokenStream;
    constructor(ts: TokenStream) {
        this.ts = ts;
    }
    parseInt(): Int {
        return new Int(BitSize.B64, false, parseInt(this.ts.get().match));
    }
    parseType(): Type {
        if (this.ts.get().type == TokenType.KeywordMut) {
            return new Type(true, this.ts.next().expectType(TokenType.Identifier).match)
        } else {
            return new Type(false, this.ts.get().expectType(TokenType.Identifier).match)
        }
    }
}
