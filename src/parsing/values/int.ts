import Node, { NodeType } from "../node";
import BitSize from "../../util/bitsize";
import Pass from "../../passes";
import Value, { ValueType } from "../value";

export default class Int extends Value {
    readonly size: BitSize;
    readonly signed: boolean;
    readonly value: number;
    constructor(value: number, size: BitSize = BitSize.B32, signed: boolean = true) {
        super(ValueType.Int);
        this.size = size;
        this.signed = signed;
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitInt(this);
    }
}
