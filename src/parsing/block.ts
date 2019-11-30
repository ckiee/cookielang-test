import Node, { NodeType } from "./node";
import Statement from "./statement";

export default class Block extends Node {
    statements: Statement[]
    constructor(statements: Statement[]) {
        super(NodeType.BLOCK);
        this.statements = statements;
    }
}