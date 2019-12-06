import Node, { NodeType } from "./node";
import Pass from "../passes";
import String from "./values/string";

export default class Import extends Node {
    readonly file: String
    readonly c: boolean
    constructor(file: String, c: boolean = true) {
        super(NodeType.IMPORT);
        this.file = file;
        this.c = c;
    }
    accept(pass: Pass): Node {
        return pass.visitImport(this);
    }
}
