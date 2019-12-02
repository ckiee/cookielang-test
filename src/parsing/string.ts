import Node, { NodeType } from "./node";
import Pass from "../passes";

export default class String extends Node {
    readonly value: string;
    constructor(value: string) {
        super(NodeType.STRING);
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitString(this);
    }
}
