import Pass from "../passes";

export enum NodeType {
    DECIMAL = "decimal", // TODO
    INT = "int",
    STRING = "string",
    ARG = "arg",
    TYPE = "type",
    PROTOTYPE = "prototype",
    STATEMENT = "statement",
    BLOCK = "block",
    FUNCTION = "function"
}

export default abstract class Node {
    readonly type: NodeType;
    constructor(type: NodeType) {
        this.type = type;
    }
    abstract accept(pass: Pass): Node
}
