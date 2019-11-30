export enum NodeType {
    FLOAT = "float", // TODO
    INT = "int",
    TYPE = "type",
    ARG = "arg",
    PROTOTYPE = "prototype",
    STATEMENT = "statement",
    BLOCK = "block",
    FUNCTION = "function"
}

export default abstract class Node {
    type: NodeType;
    constructor(type: NodeType) {
        this.type = type;
    }
}
