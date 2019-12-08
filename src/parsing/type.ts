import Node, {NodeType} from "./node";
import Pass from "../passes";

export default class Type extends Node {
    readonly mut: boolean
    readonly value: string
    // TODO: Move mut arg to the end and refactor usage instances.
    constructor(mut: boolean = false, value: string) {
        super(NodeType.Type);
        this.value = value;
        this.mut = mut;
    }
    accept(pass: Pass): Node {
        return pass.visitType(this);
    }
}
