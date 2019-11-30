export enum NodeType {
    FLOAT = "float", // TODO
    INT = "int",
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
}
