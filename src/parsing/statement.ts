import Node, { NodeType } from "./node";

enum StatementType {
    VAR_DECLARE
}
export { StatementType };

export default abstract class Statement extends Node {
    stmtType: StatementType;
    constructor(stmtType: StatementType) {
        super(NodeType.STATEMENT);
        this.stmtType = stmtType;
    }
}
