import TokenStream from "../util/tokenStream";
import Int from "./values/int";
import BitSize from "../util/bitsize";
import Type from "./type";
import TokenType from "../lexing/tokenType";
import Arg from "./arg";
import Prototype from "./prototype";
import Block from "./block";
import Function from "./function";
import VarDeclareStatement from "./statements/vardeclare";
import Node from "./node";
import String from "./values/string";
import Statement from "./statement";
import Value from "./value";
import FunctionCallStatement from "./statements/fncall";
import Import from "./import";
import VarAccess from "./values/varAccess";

export default class Parser {
    ts: TokenStream;
    constructor(ts: TokenStream) {
        this.ts = ts;
    }

    parseTopLevel(): Node {
        switch (this.ts.get().type) {
            case TokenType.KeywordFn:
                return this.parseFunction();
            case TokenType.KeywordImport:
                return this.parseImport();
            default:
                throw new Error(
                    "Token is of an unexpected type for the top level"
                );
        }
    }

    parseInt(): Int {
        // 1337
        const res = parseInt(this.ts.get().match, 10);
        this.ts.skip();
        return new Int(res);
    }
    parseType(): Type {
        // mut string OR string
        if (this.ts.get().type == TokenType.KeywordMut) {
            const tv = this.ts.next().expectType(TokenType.Identifier).match;
            this.ts.skipOver(TokenType.Identifier);
            return new Type(true, tv);
        } else {
            const tv = this.ts.get().expectType(TokenType.Identifier).match;
            this.ts.skipOver(TokenType.Identifier);
            return new Type(false, tv);
        }
    }
    parseArg(): Arg {
        // world mut string
        const id = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skip();
        // console.log(this.ts.get());
        const type = this.parseType();
        return [id.match, type];
    }
    parsePrototype(): Prototype {
        // hello (world: mut string) string
        const name = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skip();
        this.ts.skipOver(TokenType.SymbolOpenParen);
        // TODO: Use while loop to parse optional arg(s).
        const args: Arg[] = [];
        while (this.ts.get().type !== TokenType.SymbolCloseParen) {
            args.push(this.parseArg());
        }
        this.ts.skipOver(TokenType.SymbolCloseParen);
        const returnType = this.parseType();
        return new Prototype(name.match, args, returnType);
    }
    parseBlock(): Block {
        // { (statements) }
        this.ts.skipOver(TokenType.SymbolOpenBrace);
        const statements: Statement[] = [];
        while (this.ts.get().type !== TokenType.SymbolCloseBrace) {
            statements.push(this.parseStatement());
        }
        this.ts.skipOver(TokenType.SymbolCloseBrace);
        return new Block(statements);
    }
    parseFunction(): Function {
        // fn <PROTO> <BLOCk>
        this.ts.skipOver(TokenType.KeywordFn);
        return new Function(this.parsePrototype(), this.parseBlock());
    }
    parseString(): String {
        const tok = this.ts.get().expectType(TokenType.String);
        this.ts.skip();
        return new String(tok.match.slice(1, -1));
    }
    parseStatement(): Statement {
        switch (this.ts.get().type) {
            case TokenType.Identifier:
                if (this.ts.peek().type == TokenType.Identifier) {
                    return this.parseVarDeclareStatement();
                }
                if (this.ts.peek().type == TokenType.SymbolOpenParen) {
                    return this.parseFnCallStatement();
                }
            default:
                throw new Error("unknown statement type");
        }
    }
    parseVarDeclareStatement(): VarDeclareStatement {
        // int foobar [= 123]
        const type = this.parseType();
        const id = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skip();
        this.ts.skipOver(TokenType.SymbolEqual);
        const value = this.parseValue();
        return new VarDeclareStatement(id.match, type, value);
    }
    parseFnCallStatement(): FunctionCallStatement {
        const id = this.ts.get().expectType(TokenType.Identifier);
        this.ts.skip();
        this.ts.skipOver(TokenType.SymbolOpenParen);
        const args: Value[] = [];
        while (this.ts.get().type !== TokenType.SymbolCloseParen) {
            args.push(this.parseValue());
            if (this.ts.get().type !== TokenType.SymbolCloseParen)
                this.ts.skipOver(TokenType.SymbolComma);
        }
        this.ts.skipOver(TokenType.SymbolCloseParen);
        return new FunctionCallStatement(id.match, args);
    }
    parseValue(): Value {
        switch (this.ts.get().type) {
            case TokenType.Int:
                return this.parseInt();
            case TokenType.String:
                return this.parseString();
            case TokenType.Identifier:
                return this.parseVarAccess();
            // TODO: Missing decimal case.

            default:
                throw new Error("unknown value type " + this.ts.get().type);
        }
    }
    parseVarAccess() {
        const res = new VarAccess(
            this.ts.get().expectType(TokenType.Identifier).match
        );
        this.ts.skip();
        return res;
    }
    parseImport(): Import {
        // import "stdio.h"
        this.ts.skipOver(TokenType.KeywordImport);
        const file = this.parseString();
        return new Import(file);
    }
}
