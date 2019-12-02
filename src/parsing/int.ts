import Node, { NodeType } from "./node";
import BitSize from "../util/bitsize";
import Pass from "../passes";

export default class Int extends Node {
    readonly size: BitSize;
    readonly signed: boolean;
    readonly value: number;
    constructor(size: BitSize, signed: boolean, value: number) {
        super(NodeType.INT);
        this.size = size;
        this.signed = signed;
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitInt(this);
    }
}
