enum TokenType {
    Comment = "comment",
    KeywordFn = "keywordFn",
    KeywordMut = "keywordMut",
    Float = "float",
    Int = "int",
    Identifier = "identifier",
    SymbolOpenParen = "symbolOpenParen",
    SymbolCloseParen = "symbolCloseParen",
    SymbolOpenBrace = "symbolOpenBrace",
    SymbolCloseBrace = "symbolCloseBrace",
    Whitespace = "whitespace"
}
export const regexps = {
    comment: /^(\/\/.*)|(\/\*(.|[\n])*\*\/)/,

    keywordFn: /^fn/,
    keywordMut: /^mut/,
    float: /^\d+\.\d+/,
    int: /^\d+/,
    identifier: /^\w+/,
    symbolOpenParen: /^\(/,
    symbolCloseParen: /^\(/,
    symbolOpenBrace: /^\{/,
    symbolCloseBrace: /^\{/,

    whitespace: /^\s+/
} as RegexpMap;

export default TokenType;
type RegexpMap = { [key: string]: RegExp };
export function getTokenTypeRegexp(tt: TokenType): RegExp {
    return regexps[tt];
}
