import Pass from "../passes";

export enum NodeType {
    Decimal = "decimal", // TODO
    Value = "value",
    Arg = "arg",
    Type = "type",
    Prototype = "prototype",
    Statement = "statement",
    Block = "block",
    Function = "function",
    Import = "import",
    ForwardDecleration = "forwardDecleration"
}

export default abstract class Node {
    readonly nodeType: NodeType;
    constructor(type: NodeType) {
        this.nodeType = type;
    }
    abstract accept(pass: Pass): Node
}
