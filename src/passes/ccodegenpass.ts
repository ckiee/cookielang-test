import Pass from ".";
import Int from "../parsing/int";
import String from "../parsing/string";
import Node from "../parsing/node";
import Type from "../parsing/type";
import Prototype from "../parsing/prototype";
import Statement, { StatementType } from "../parsing/statement";
import Block from "../parsing/block";
import Function from "../parsing/function";
import CNode from "../ccodegen/cnode";
import CBuilder from "../ccodegen/builder";
import VarDeclareStatement from "../parsing/statements/vardeclare";

export default class CCodeGenPass extends Pass {
    valueStack: string[] = [];
    visitInt(node: Int): Node {
        this.valueStack.push(node.value.toString())
        return node;
    }
    visitString(node: String): Node {
        this.valueStack.push(CNode.string(node.value).toString())
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
        switch (node.stmtType) {
            case StatementType.VAR_DECLARE:
                return this.visitVarDeclareStmt(node as VarDeclareStatement);
            default:
                throw new Error("unknown statement type")
        }
    }
    visitBlock(node: Block): Node {
        return node;
    }
    visitFunction(node: Function): Node {
        return node;
    }
    visitVarDeclareStmt(node: VarDeclareStatement): Node {
        return node;
    }
}
