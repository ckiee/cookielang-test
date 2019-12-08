import Pass from "../../passes";
import Node from "../node";
import Expr, { ExprType } from "./expr";

export default class VariableRef extends Expr {
    readonly id: string;
    constructor(id: string) {
        super(ExprType.VariableRef);
        this.id = id;
    }
    accept(pass: Pass): Node {
        return pass.visitVarRef(this);
    }
}
