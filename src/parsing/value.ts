import Node from "./node";

enum ValueType {
    Int,
    String,
    Decimal
}
export { ValueType }
export default interface Value extends Node {
    readonly valueType: ValueType
}