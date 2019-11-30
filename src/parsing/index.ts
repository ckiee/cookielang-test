import TokenStream from "../util/tokenStream";
import Int from "./int";
import BitSize from "../util/bitsize";
import Type from "./type";
import TokenType from "../lexing/tokenType";
import Arg from "./arg";
import Prototype from "./prototype";
import Block from "./block";
import Function from "./function";
import VarDeclareStatement from "./vardeclare";
import Node from "./node";
import String from "./string";

export default class Parser {
    ts: TokenStream;
    constructor(ts: TokenStream) {
        this.ts = ts;
    }

    parseTopLevel(): Node {
        switch (this.ts.get().type) {
            case TokenType.KeywordFn:
                return this.parseFunction();

            default:
                throw new Error(
                    "Token is of an unexpected type for the top level"
                );
        }
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
            const tv = this.ts.get().expectType(TokenType.Identifier).match;
            this.ts.skip();
            return new Type(false, tv);
        }
    }
    parseArg(): Arg {
        // world: mut string
        const id = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skip();
        this.ts.skipOver(TokenType.SymbolColon);
        return [id.match, this.parseType()];
    }
    parsePrototype(): Prototype {
        // hello (world: mut string) string
        const name = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skip();
        this.ts.skipOver(TokenType.SymbolOpenParen);
        const args = [this.parseArg()];
        this.ts.skip();
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
    parseString(): String {
        const tok = this.ts.get().expectType(TokenType.String);
        return new String(tok.match.slice(0, -1));
    }
    parseVarDeclareStatement(): VarDeclareStatement {
        // foobar: int = 123
        const id = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skipOver(TokenType.SymbolColon);
        const type = this.parseType();
        this.ts.skipOver(TokenType.SymbolEqual);
        // TODO: not ignore value
        this.ts.skip();
        return new VarDeclareStatement(
            id.match,
            type,
            new Int(BitSize.B16, false, 1337)
        );
    }
}
