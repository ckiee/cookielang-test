enum CKeyword {
    Auto = "auto",
    Break = "break",
    Case = "case",
    Char = "char",
    Const = "const",
    Continue = "continue",
    Default = "default",
    Do = "do",
    Double = "double",
    Else = "else",
    Enum = "enum",
    Extern = "extern",
    Float = "float",
    For = "for",
    Goto = "goto",
    If = "if",
    Int = "int",
    Long = "long",
    Register = "register",
    Return = "return",
    Short = "short",
    Signed = "signed",
    Sizeof = "sizeof",
    Static = "static",
    Struct = "struct",
    Switch = "switch",
    Typedef = "typedef",
    Union = "union",
    Unsigned = "unsigned",
    Void = "void",
    Volatile = "volatile",
    While = "while",

    PreprocessInclude = "#include"
}

enum CSymbol {
    BraceL = "{",
    BraceR = "}",
    ParenL = "(",
    ParenR = ")",
    Sharp = "#",
    Equal = "=",
    Bang = "!",
    DubQuote = '"',
    SemiColon = ";",
    Comma = ","
}
type CEntity = CSymbol | CKeyword | string
type CType = CKeyword | string

export {CKeyword, CSymbol, CType, CEntity};
