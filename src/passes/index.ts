import Int from "../parsing/values/int";
import String from "../parsing/values/string";
import Node from "../parsing/node";
import Type from "../parsing/type";
import Prototype from "../parsing/prototype";
import Statement from "../parsing/statement";
import Block from "../parsing/block";
import Function from "../parsing/function";
import VarDeclareStatement from "../parsing/statements/vardeclare";
import FunctionCallStatement from "../parsing/statements/fncall";
import Import from "../parsing/import";
import VarAccess from "../parsing/values/varAccess";
import ForwardDecleration from "../parsing/forwardDecl";

export default abstract class Pass {
    visitInt(node: Int): Node {
        return node;
    }
    visitString(node: String): Node {
        return node;
    }
    //visitArg not needed
    visitType(node: Type): Node {
        return node;
    }
    visitPrototype(node: Prototype): Node {
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
    visitVarDeclareStmt(node: VarDeclareStatement): Node {
        return node;
    }
    visitFnCallStmt(node: FunctionCallStatement): Node {
        return node;
    }
    visitImport(node: Import): Node {
        return node;
    }
    visitTopLevel(node: Node): Node {
        return node;
    }
    visitVarAccess(node: VarAccess): Node {
        return node;
    }
    visitForwardDecl(node: ForwardDecleration): Node {
        return node;
    }
}
