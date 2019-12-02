import Node, { NodeType } from "../node";
import Pass from "../../passes";
import Value, { ValueType } from "../value";

export default class String extends Node implements Value {
    readonly value: string;
    readonly valueType = ValueType.Int 
    constructor(value: string) {
        super(NodeType.STRING);
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitString(this);
    }
}