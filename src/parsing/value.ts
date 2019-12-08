import Node, { NodeType } from "./node";

enum ValueType {
    Int,
    String,
    Decimal,
    Expr
}
export { ValueType }
export default abstract class Value extends Node {
    readonly valueType: ValueType
    constructor(valueType: ValueType) {
        super(NodeType.Value);
        this.valueType = valueType;
    }
}