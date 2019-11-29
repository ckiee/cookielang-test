import Node, { NodeType } from "./node";
import BitSize from "../bitsize";

export default class Int extends Node {
    size: BitSize;
    signed: boolean;
    value: number;
    constructor(size: BitSize, signed: boolean, value: number) {
        super(NodeType.INT);
        this.size = size;
        this.signed = signed;
        this.value = value;
    }
}
