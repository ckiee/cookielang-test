import Node, { NodeType } from "./node";
import Type from "./type";
import Arg from "./arg";

export default class Prototype extends Node {
    name: string;
    args: Arg[];
    returnType: Type;
    constructor(name: string, args: Arg[], returnType: Type) {
        super(NodeType.PROTOTYPE);
        this.name = name;
        this.args = args;
        this.returnType = returnType;
    }
}
