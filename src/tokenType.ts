enum TokenType {
    Comment = "comment",
    KeywordFn = "keywordFn",
    KeywordMut = "keywordMut",
    Decimal = "decimal",
    Int = "int",
    String = "string",
    Identifier = "identifier",
    SymbolComma = "symbolComma",
    SymbolColon = "symbolColon",
    SymbolOpenParen = "symbolOpenParen",
    SymbolCloseParen = "symbolCloseParen",
    SymbolOpenBrace = "symbolOpenBrace",
    SymbolCloseBrace = "symbolCloseBrace",
    SymbolEqual = "symbolEqual",
    SymbolDubQuote = "symbolDubQuote",

    Whitespace = "whitespace"
}
export const regexps = {
    comment: /^(\/\/.*)|(\/\*(.|[\n])*\*\/)/,

    keywordFn: /^fn/,
    keywordMut: /^mut/,
    decimal: /^\d+\.\d+/,
    int: /^\d+/,
    string: /^".+"/,
    identifier: /^\w+/,
    symbolOpenParen: /^\(/,
    symbolCloseParen: /^\)/,
    symbolOpenBrace: /^\{/,
    symbolCloseBrace: /^\{/,
    symbolComma: /^,/,
    symbolColon: /^:/,
    symbolEqual: /^=/,
    symbolDubQuote: /^"/,

    whitespace: /^\s+/
} as RegexpMap;

export default TokenType;
type RegexpMap = { [key: string]: RegExp };
export function getTokenTypeRegexp(tt: TokenType): RegExp {
    return regexps[tt];
}
