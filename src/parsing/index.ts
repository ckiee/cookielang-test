import TokenStream from "../tokenStream";
import Int from "./int";
import BitSize from "../bitsize";
import Type from "./type";
import TokenType from "../tokenType";
import Arg from "./arg";
import Prototype from "./prototype";

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
            return new Type(
                true,
                this.ts.next().expectType(TokenType.Identifier).match
            );
        } else {
            return new Type(
                false,
                this.ts.get().expectType(TokenType.Identifier).match
            );
        }
    }
    parseArg(): Arg {
        // world: mut string
        const id = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skipOver(TokenType.SymbolColon);
        return [id.match, this.parseType()];
    }
    parsePrototype(): Prototype {
        const name = this.ts.get().expectType(TokenType.Identifier);
        return new Prototype(name.match, [this.parseArg()], this.parseType())

    }
}
