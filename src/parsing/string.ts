import Node, { NodeType } from "./node";

export default class String extends Node {
    readonly value: string;
    constructor(value: string) {
        super(NodeType.STRING);
        this.value = value;
    }
}
