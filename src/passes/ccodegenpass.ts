import Pass from ".";
import Int from "../parsing/int";
import String from "../parsing/string";
import Node from "../parsing/node";
import Type from "../parsing/type";
import Prototype from "../parsing/prototype";
import Statement from "../parsing/statement";
import Block from "../parsing/block";
import Function from "../parsing/function";
import CNode from "../ccodegen/node";
import CBuilder from "../ccodegen/builder";

export default class CCodeGenPass extends Pass {
    valueStack: string[] = [];
    visitInt(node: Int): Node {
        return node;
    }
    visitString(node: String): Node {
        return node;
    }
    //visitArg not needed
    visitType(node: Type): Node {
        this.valueStack.push(node.value);
        return node;
    }
    visitPrototype(node: Prototype): Node {
        this.visitType(node.returnType);
        // TODO: dont use !
        this.valueStack.push(
            CNode.proto(this.valueStack.pop()!, node.name).toString()
        );
        return node;
    }
    visitStatement(node: Statement): Node {
        return node;
    }
    visitBlock(node: Block): Node {
        return node;
    }
    visitFunction(node: Function): Node {
        return node;
    }
}
