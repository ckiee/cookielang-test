import Pass from "../passes";

export enum NodeType {
    Decimal = "decimal", // TODO
    Int = "int",
    String = "string",
    Arg = "arg",
    Type = "type",
    Prototype = "prototype",
    Statement = "statement",
    Block = "block",
    Function = "function",
    Import = "import",
    VarAccess = "varAccess",
    ForwardDecleration = "forwardDecleration"
}

export default abstract class Node {
    readonly type: NodeType;
    constructor(type: NodeType) {
        this.type = type;
    }
    abstract accept(pass: Pass): Node
}
