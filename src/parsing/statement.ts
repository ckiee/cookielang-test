import Node, { NodeType } from "./node";

enum StatementType {
    VarDeclare,
    FnCall
}
export { StatementType };

export default abstract class Statement extends Node {
    stmtType: StatementType;
    constructor(stmtType: StatementType) {
        super(NodeType.Statement);
        this.stmtType = stmtType;
    }
}
