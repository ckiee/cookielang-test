import Value, { ValueType } from "../value";
import { NodeType } from "../..";

enum ExprType {
    FnCall,
    VariableRef
}
export { ExprType };
export default abstract class Expr extends Value {
    readonly exprType: ExprType;
    constructor(exprType: ExprType) {
        super(ValueType.Expr);
        this.exprType = exprType;
    }
}
