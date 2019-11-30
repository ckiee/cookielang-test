import Lexer, { Token } from "../lexer";
import TokenType from "../tokenType";

test("it lexes comment", () => {
    const tokens = new Lexer("// hello").lex();
    expect(tokens).toEqual([new Token(TokenType.Comment, "// hello")]);

    const tokens2 = new Lexer("/*hello\nworld*/").lex();
    expect(tokens2).toEqual([new Token(TokenType.Comment, "/*hello\nworld*/")]);
});

test("it lexes keywords", () => {
    const tokens = new Lexer("fn").lex();
    expect(tokens).toEqual([new Token(TokenType.KeywordFn, "fn")]);
});

test("it lexes identifier", () => {
    const tokens = new Lexer("world").lex();
    expect(tokens).toEqual([new Token(TokenType.Identifier, "world")]);
});

test("it lexes int", () => {
    const tokens = new Lexer("1337").lex();
    expect(tokens).toEqual([new Token(TokenType.Int, "1337")]);
});

test("it lexes decimal", () => {
    const tokens = new Lexer("30.14").lex();
    expect(tokens).toEqual([new Token(TokenType.Decimal, "30.14")]);
});

test("it lexes whitespace", () => {
    const tokens = new Lexer("            \n\n    ").lex();
    expect(tokens).toEqual([
        new Token(TokenType.Whitespace, "            \n\n    ")
    ]);
});

test("it ignores whitespace tokens", () => {
    const tokens = new Lexer("            \n\n    ", true).lex();
    expect(tokens).toEqual([]);
});
