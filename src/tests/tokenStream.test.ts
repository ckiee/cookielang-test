import TokenStream from "../tokenStream";
import TokenType from "../tokenType";
import { Token } from "../lexer";
let ts: TokenStream;

beforeEach(() => {
    ts = new TokenStream([
        new Token(TokenType.Identifier, "hello"),
        new Token(TokenType.Identifier, "world")
    ]);
});

test("it skips over tokens", () => {
    ts.skipOver(TokenType.Identifier);
    expect(ts.get()).toEqual({ type: "identifier", match: "world" });
});

test("it fails skipping over the wrong type of token", () => {
    expect(() => {
        ts.skipOver(TokenType.Whitespace);
    }).toThrow(/expected token whitespace.+/);
});

test("it peeks", () => {
    expect(ts.peek()).toEqual({ type: "identifier", match: "world" });
});

test("it goes to the next token", () => {
    expect(ts.next()).toEqual({ type: "identifier", match: "world" });
});

test("it gets the current token", () => {
    expect(ts.get()).toEqual({ type: "identifier", match: "hello" });
});

test("it goes to the end of the tokenstream", () => {
    ts.next();
    expect(ts.next()).toEqual(undefined);
});

test("it knows about the end", () => {
    ts.next();
    expect(ts.hasNext()).toEqual(false);
});
