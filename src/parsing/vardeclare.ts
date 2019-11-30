import Statement, { StatementType } from "./statement";
import Type from "./type";
import Node from "./node";

export default class VarDeclareStatement extends Statement {
    id: string
    vType: Type
    value: Node
    constructor(id: string, vType: Type, value: Node) {
        // TODO: make value arg less general
        super(StatementType.VAR_DECLARE);
        this.id = id;
        this.vType = vType;
        this.value = value;
    }
}
