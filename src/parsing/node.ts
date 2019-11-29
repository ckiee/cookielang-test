export enum NodeType {
    FLOAT, // TODO
    INT,
    TYPE,
    ARG,
    PROTOTYPE,
    STATEMENT,
    BLOCK, 
    FUNCTION // TODO
}

export default abstract class Node {
    type: NodeType;
    constructor(type: NodeType) {
        this.type = type;
    }
}
