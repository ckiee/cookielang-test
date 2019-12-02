import Node, { NodeType } from "./node";
import Type from "./type";
import Arg from "./arg";
import Pass from "../passes";

export default class Prototype extends Node {
    readonly name: string;
    readonly args: Arg[];
    readonly returnType: Type;
    constructor(name: string, args: Arg[], returnType: Type) {
        super(NodeType.PROTOTYPE);
        this.name = name;
        this.args = args;
        this.returnType = returnType;
    }
    accept(pass: Pass): Node {
        return pass.visitPrototype(this);
    }
}
