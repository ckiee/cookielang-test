import Node, { NodeType } from "../node";
import Pass from "../../passes";
import Value, { ValueType } from "../value";

export default class String extends Value {
    readonly value: string;
    constructor(value: string) {
        super(ValueType.String);
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitString(this);
    }
}
