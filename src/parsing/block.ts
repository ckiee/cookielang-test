import Node, { NodeType } from "./node";
import Statement from "./statement";
import Pass from "../passes";

export default class Block extends Node {
    readonly statements: Statement[]
    constructor(statements: Statement[]) {
        super(NodeType.BLOCK);
        this.statements = statements;
    }
    accept(pass: Pass): Node {
        return pass.visitBlock(this);
    }
}