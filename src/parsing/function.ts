import Node, { NodeType } from "./node";
import Prototype from "./prototype";
import Block from "./block";
import Pass from "../passes";

export default class Function extends Node {
    readonly proto: Prototype;
    readonly block: Block;
    constructor(proto: Prototype, block: Block) {
        super(NodeType.Function);
        this.proto = proto;
        this.block = block;
    }
    accept(pass: Pass): Node {
        return pass.visitFunction(this);
    }
}
