import Lexer from "../lexer";

test("it lexes comment", () => {
    const tokens = new Lexer("//hello").lex();
    expect(tokens).toEqual([{ match: "//hello", type: "comment" }]);

    const tokens2 = new Lexer("/*hello\nworld*/").lex();
    expect(tokens2).toEqual([{ match: "/*hello\nworld*/", type: "comment" }]);
});

test("it lexes keywords", () => {
    const tokens = new Lexer("fn").lex();
    expect(tokens).toEqual([{ match: "fn", type: "keywordFn" }]);
});

test("it lexes identifier", () => {
    const tokens = new Lexer("world").lex();
    expect(tokens).toEqual([{ match: "world", type: "identifier" }]);
});

test("it lexes int", () => {
    const tokens = new Lexer("1337").lex();
    expect(tokens).toEqual([{ match: "1337", type: "int" }]);
});

test("it lexes float", () => {
    const tokens = new Lexer("30.14").lex();
    expect(tokens).toEqual([{ match: "30.14", type: "float" }]);
});

test("it lexes whitespace", () => {
    const tokens = new Lexer("            \n\n    ").lex();
    expect(tokens).toEqual([
        { match: "            \n\n    ", type: "whitespace" }
    ]);
});

test("it ignores whitespace tokens", () => {
    const tokens = new Lexer("            \n\n    ", true).lex();
    expect(tokens).toEqual([]);
});
