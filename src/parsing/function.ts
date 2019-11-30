import Node, { NodeType } from "./node";
import Prototype from "./prototype";
import Block from "./block";

export default class Function extends Node {
    readonly proto: Prototype;
    readonly block: Block;
    constructor(proto: Prototype, block: Block) {
        super(NodeType.FUNCTION);
        this.proto = proto;
        this.block = block;
    }
}
