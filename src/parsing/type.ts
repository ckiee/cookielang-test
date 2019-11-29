import Node, { NodeType } from "./node";

export default class Type extends Node {
    mut: boolean
    value: string
    constructor(value: string, mut: boolean = false) {
        super(NodeType.TYPE);
        this.value = value; 
        this.mut = mut;
    }
}