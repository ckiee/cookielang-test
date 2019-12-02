import Node, { NodeType } from "./node";
import Pass from "../passes";

export default class Type extends Node {
    readonly mut: boolean
    readonly value: string
    constructor(mut: boolean = false, value: string) {
        super(NodeType.TYPE);
        this.value = value; 
        this.mut = mut;
    }
    accept(pass: Pass): Node {
        return pass.visitType(this);
    }
}