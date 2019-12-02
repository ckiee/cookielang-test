import Node, { NodeType } from "../node";
import BitSize from "../../util/bitsize";
import Pass from "../../passes";
import Value, { ValueType } from "../value";

export default class Int extends Node implements Value {
    readonly size: BitSize;
    readonly signed: boolean;
    readonly value: number;
    readonly valueType = ValueType.Int
    constructor(value: number, size: BitSize = BitSize.B32, signed: boolean = true) {
        super(NodeType.INT);
        this.size = size;
        this.signed = signed;
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitInt(this);
    }
}
