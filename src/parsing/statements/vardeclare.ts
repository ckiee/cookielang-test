import Statement, { StatementType } from "../statement";
import Type from "../type";
import Node from "../node";
import Pass from "../../passes";

export default class VarDeclareStatement extends Statement {
    readonly id: string;
    readonly vType: Type;
    readonly value: Node;
    constructor(id: string, vType: Type, value: Node) {
        // TODO: make value arg less general
        super(StatementType.VAR_DECLARE);
        this.id = id;
        this.vType = vType;
        this.value = value;
    }
    accept(pass: Pass): Node {
        return pass.visitVarDeclareStmt(this);
    }
}
