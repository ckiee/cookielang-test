import Statement, {StatementType} from "../statement";
import Type from "../type";
import Node from "../node";
import Pass from "../../passes";
import Value from "../value";

export default class VarDeclareStatement extends Statement {
    readonly id: string;
    readonly vType: Type;
    readonly value: Value;
    constructor(id: string, vType: Type, value: Value) {
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
