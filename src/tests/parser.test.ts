import TokenStream from "../tokenStream";
import TokenType from "../tokenType";
import Parser from "../parsing";
import { Token } from "../lexer";
import Type from "../parsing/type";
import Int from "../parsing/int";
import BitSize from "../bitsize";
import Prototype from "../parsing/prototype";

test("it parses int", () => {
    const ts = new TokenStream([new Token(TokenType.Int, "100")]);
    const parser = new Parser(ts);
    expect(parser.parseInt()).toEqual(new Int(BitSize.B64, false, 100));
});

test("it parses arg", () => {
    const ts = new TokenStream([
        new Token(TokenType.Identifier, "world"),
        new Token(TokenType.SymbolColon, ":"),
        new Token(TokenType.KeywordMut, "mut"),
        new Token(TokenType.Identifier, "string")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseArg()).toEqual(["world", new Type(true, "string")]);
});

test("it parses type", () => {
    const ts = new TokenStream([
        new Token(TokenType.KeywordMut, "mut"),
        new Token(TokenType.Identifier, "string")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseType()).toEqual(new Type(true, "string"));
});

test("it parses prototype", () => {
    const ts = new TokenStream([
        new Token(TokenType.Identifier, "hello"),
        new Token(TokenType.SymbolOpenParen, "("),
        new Token(TokenType.Identifier, "world"),
        new Token(TokenType.SymbolColon, ":"),
        new Token(TokenType.KeywordMut, "mut"),
        new Token(TokenType.Identifier, "string"),
        new Token(TokenType.SymbolCloseParen, ")"),
        new Token(TokenType.Identifier, "string")
    ]);
    const parser = new Parser(ts);
    expect(parser.parsePrototype()).toEqual(
        new Prototype(
            "hello",
            [["world", new Type(true, "string")]],
            new Type(false, "string")
        )
    );
});

test.todo("it parses block")