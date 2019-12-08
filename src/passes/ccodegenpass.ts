import Pass from ".";
import Int from "../parsing/values/int";
import String from "../parsing/values/string";
import Node, { NodeType } from "../parsing/node";
import Type from "../parsing/type";
import Prototype from "../parsing/prototype";
import Statement, { StatementType } from "../parsing/statement";
import Block from "../parsing/block";
import Function from "../parsing/function";
import CNode from "../ccodegen/cnode";
import VarDeclareStatement from "../parsing/statements/vardeclare";
import FunctionCallStatement from "../parsing/statements/fncall";
import Import from "../parsing/import";
import Arg from "../parsing/arg";
import VarAccess from "../parsing/values/varAccess";
import ForwardDecleration from "../parsing/forwardDecl";

export default class CCodeGenPass extends Pass {
    valueStack: string[] = [];
    visitInt(node: Int): Node {
        this.valueStack.push(node.value.toString());
        return node;
    }
    visitString(node: String): Node {
        this.valueStack.push(CNode.string(node).toString());
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
            CNode.proto(this.valueStack.pop()!, node.args, node.name).toString()
        );
        return node;
    }
    visitStatement(node: Statement): Node {
        switch (node.stmtType) {
            case StatementType.VarDeclare:
                return this.visitVarDeclareStmt(node as VarDeclareStatement);
            case StatementType.FnCall:
                return this.visitFnCallStmt(node as FunctionCallStatement);
            default:
                throw new Error("unknown statement type");
        }
    }
    visitBlock(node: Block): Node {
        const statements = [];

        // Visit the block's statements.
        for (const statement of node.statements) {
            this.visitStatement(statement);
            statements.push(this.valueStack.pop()!);
        }

        this.valueStack.push(CNode.block(statements).toString());

        return node;
    }
    visitFunction(node: Function): Node {
        this.visitPrototype(node.proto);
        const proto = this.valueStack.pop()!;
        this.visitBlock(node.block);
        const body = this.valueStack.pop()!;

        this.valueStack.push(CNode.fn(proto, body).toString());

        return node;
    }
    visitVarDeclareStmt(node: VarDeclareStatement): Node {
        // TODO: Need to visit node's props.
        this.valueStack.push(
            // TODO: hard-coded value

            CNode.varDeclare(
                node.vType.value,
                node.id,
                node.value /*node.value*/
            ).toString()
        );
        return node;
    }
    visitFnCallStmt(node: FunctionCallStatement): Node {
        this.valueStack.push(CNode.fnCall(node.id, node.args));
        return node;
    }
    visitImport(node: Import): Node {
        this.valueStack.push(CNode.import(node.file));
        return node;
    }
    visitTopLevel(node: Node): Node {
        switch (node.type) {
            case NodeType.Function:
                return this.visitFunction(<Function>node);
            case NodeType.Import:
                return this.visitImport(<Import>node);
            default:
                throw new Error("unknown top level nodetype");
        }
    }
    visitVarAccess(node: VarAccess): Node {
        this.valueStack.push(node.id);
        return node;
    }
    visitForwardDecl(node: ForwardDecleration): Node {
        this.visitPrototype(node.proto);
        return node;
    }
}
