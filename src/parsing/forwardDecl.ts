import Node, { NodeType } from "./node";
import Type from "./type";
import Arg from "./arg";
import Pass from "../passes";
import Prototype from "./prototype";

export default class ForwardDecleration extends Node {
    readonly proto: Prototype;
    constructor(proto: Prototype) {
        super(NodeType.ForwardDecleration);
        this.proto = proto;
    }
    accept(pass: Pass): Node {
        return pass.visitForwardDecl(this);
    }
}
