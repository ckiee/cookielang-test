import Node, { NodeType } from "../node";
import Pass from "../../passes";
import Value, { ValueType } from "../value";

export default class VarAccess extends Node implements Value {
    readonly id: string;
    readonly valueType = ValueType.VarAccess 
    constructor(id: string) {
        super(NodeType.VAR_ACCESS);
        this.id = id;
    }
    accept(pass: Pass): Node {
        return pass.visitVarAccess(this);
    }
}
