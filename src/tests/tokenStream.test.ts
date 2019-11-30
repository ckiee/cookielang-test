import TokenStream from "../tokenStream";
import TokenType from "../tokenType";
import { Token } from "../lexer";
let ts: TokenStream;

beforeEach(() => {
    ts = new TokenStream([
        new Token(TokenType.Identifier, "hello"),
        new Token(TokenType.Identifier, "world"),
        new Token(TokenType.Identifier, "foo")
    ]);
});

test("it skips over tokens", () => {
    ts.skipOver(TokenType.Identifier)
    expect(ts.get()).toEqual({
        type: TokenType.Identifier,
        match: "world"
    });
});

test("it fails skipping over the wrong type of token", () => {
    expect(() => {
        ts.skipOver(TokenType.Whitespace);
    }).toThrow(/expected token whitespace.+/);
});

test("it peeks", () => {
    expect(ts.peek()).toEqual({ type: TokenType.Identifier, match: "world" });
});

test("it goes to the next token", () => {
    expect(ts.next()).toEqual({ type: TokenType.Identifier, match: "world" });
});

test("it gets the current token", () => {
    expect(ts.get()).toEqual({ type: TokenType.Identifier, match: "hello" });
});

test("it goes to the end of the tokenstream", () => {
    ts.skip(2)
    expect(ts.next()).toEqual(undefined);
});

test("it knows about the end", () => {
    ts.skip(2)
    expect(ts.hasNext()).toEqual(false);
});
