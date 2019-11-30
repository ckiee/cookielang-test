import TokenStream from "../tokenStream";
import Int from "./int";
import BitSize from "../bitsize";
import Type from "./type";
import TokenType from "../tokenType";
import Arg from "./arg";
import Prototype from "./prototype";
import Block from "./block";
import Function from "./function";

export default class Parser {
    ts: TokenStream;
    constructor(ts: TokenStream) {
        this.ts = ts;
    }
    parseInt(): Int {
        // 1337
        return new Int(BitSize.B64, false, parseInt(this.ts.get().match));
    }
    parseType(): Type {
        // mut string OR string
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
        // hello (world: mut string) string
        const name = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skipOver(TokenType.SymbolOpenParen);
        const args = [this.parseArg()];
        this.ts.skipOver(TokenType.SymbolCloseParen);
        const returnType = this.parseType();
        return new Prototype(name.match, args, returnType);
    }
    parseBlock(): Block {
        // { (statements) }
        this.ts.skipOver(TokenType.SymbolOpenBrace);
        this.ts.skipOver(TokenType.SymbolCloseBrace);
        return new Block([]);
    }
    parseFunction(): Function {
        // fn <PROTO> <BLOCk>
        this.ts.skipOver(TokenType.KeywordFn);
        return new Function(this.parsePrototype(), this.parseBlock());
    }
}
