import TokenStream from "../util/tokenStream";
import TokenType from "../lexing/tokenType";
import Parser from "../parsing";
import { Token } from "../lexing/lexer";
import Type from "../parsing/type";
import Int from "../parsing/values/int";
import Prototype from "../parsing/prototype";
import String from "../parsing/values/string";
import Function from "../parsing/function";
import Block from "../parsing/block";
import VarDeclareStatement from "../parsing/statements/vardeclare";
import FunctionCallStatement from "../parsing/statements/fncall";
import Import from "../parsing/import";

test("it parses int", () => {
    const ts = new TokenStream([new Token(TokenType.Int, "100")]);
    const parser = new Parser(ts);
    expect(parser.parseInt()).toEqual(new Int(100));
});

test("it parses arg", () => {
    const ts = new TokenStream([
        new Token(TokenType.Identifier, "world"),
        new Token(TokenType.KeywordMut, "mut"),
        new Token(TokenType.Identifier, "string")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseArg()).toEqual(["world", new Type(true, "string")]);
});

test("it parses immutable arg", () => {
    const ts = new TokenStream([
        new Token(TokenType.Identifier, "world"),
        new Token(TokenType.Identifier, "string")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseArg()).toEqual(["world", new Type(false, "string")]);
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
test("it parses string", () => {
    const ts = new TokenStream([new Token(TokenType.String, `"hello"`)]);
    const parser = new Parser(ts);
    expect(parser.parseString()).toEqual(new String("hello"));
});
test("it parses function", () => {
    const ts = new TokenStream([
        new Token(TokenType.KeywordFn, "fn"),
        new Token(TokenType.Identifier, "main"),
        new Token(TokenType.SymbolOpenParen, "("),
        new Token(TokenType.Identifier, "world"),
        new Token(TokenType.KeywordMut, "mut"),
        new Token(TokenType.Identifier, "string"),
        new Token(TokenType.SymbolCloseParen, ")"),
        new Token(TokenType.Identifier, "string"),
        new Token(TokenType.SymbolOpenBrace, "{"),
        new Token(TokenType.SymbolCloseBrace, "}")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseFunction()).toEqual(
        new Function(
            new Prototype(
                "main",
                [["world", new Type(true, "string")]],
                new Type(false, "string")
            ),
            new Block([])
        )
    );
});

test("it parses block", () => {
    const ts = new TokenStream([
        new Token(TokenType.SymbolOpenBrace, "{"),
        new Token(TokenType.Identifier, "int"),
        new Token(TokenType.Identifier, "hi"),
        new Token(TokenType.SymbolEqual, "="),
        new Token(TokenType.Int, "123"),
        new Token(TokenType.SymbolCloseBrace, "}")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseBlock()).toEqual(
        new Block([
            new VarDeclareStatement("hi", new Type(false, "int"), new Int(123))
        ])
    );
});

test("it parses fn call", () => {
    const ts = new TokenStream([
        new Token(TokenType.Identifier, "bag"),
        new Token(TokenType.SymbolOpenParen, "("),
        new Token(TokenType.Int, "1337"),
        new Token(TokenType.SymbolComma, ","),
        new Token(TokenType.String, `"foo"`),
        new Token(TokenType.SymbolCloseParen, ")")
    ]);
    const parser = new Parser(ts);
    expect(parser.parseFnCallStatement()).toEqual(
        new FunctionCallStatement("bag", [new Int(1337), new String("foo")])
    );
});

test("it parses import", () => {
    const ts = new TokenStream([
        new Token(TokenType.KeywordImport, "import"),
        new Token(TokenType.String, '"stdio.h"')
    ]);
    const parser = new Parser(ts);
    expect(parser.parseImport()).toEqual(new Import(new String("stdio.h")));
});

test.todo("it parses var access")