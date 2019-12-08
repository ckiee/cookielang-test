import Node, { NodeType } from "../node";
import Pass from "../../passes";
import Value, { ValueType } from "../value";

export default class String extends Node implements Value {
    readonly value: string;
    readonly valueType = ValueType.String 
    constructor(value: string) {
        super(NodeType.String);
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitString(this);
    }
}
