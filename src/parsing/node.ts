export enum NodeType {
    FLOAT,
    INT,
    PROTOTYPE,
    BLOCK,
    FUNCTION
}

export default abstract class Node {
    type: NodeType
    constructor(type: NodeType) {
        this.type = type;
    }
}