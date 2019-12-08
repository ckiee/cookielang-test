import Pass from "../../passes";
import Arg from "../arg";
import Node from "../node";
import Statement, { StatementType } from "../statement";
import Type from "../type";
import Value from "../value";

export default class FunctionCallStatement extends Statement {
    readonly id: string;
    readonly args: Value[]
    constructor(id: string, args: Value[]) {
        // TODO: make value arg less general
        super(StatementType.FnCall);
        this.id = id;
        this.args = args;
    }
    accept(pass: Pass): Node {
        return pass.visitFnCallStmt(this);
    }
}
