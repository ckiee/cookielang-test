import CCodeGenPass from "../passes/ccodegenpass";
import Prototype from "../parsing/prototype";
import Type from "../parsing/type";
import Function from "../parsing/function";
import Block from "../parsing/block";
import VarDeclareStatement from "../parsing/statements/vardeclare";
import Int from "../parsing/values/int";
import String from "../parsing/values/string";
import FunctionCallStatement from "../parsing/statements/fncall";
import Import from "../parsing/import";

test("it emits C proto", () => {
    const cgp = new CCodeGenPass();
    cgp.visitPrototype(new Prototype("main", [], new Type(true, "void")));
    expect(cgp.valueStack.pop()).toEqual("void main ( )");
});

test("it emits fn", () => {
    const cgp = new CCodeGenPass();
    cgp.visitFunction(
        new Function(
            new Prototype(
                "main",
                [["leet", new Type(false, "int")]],
                new Type(false, "int")
            ),
            new Block([])
        )
    );
    expect(cgp.valueStack.pop()).toEqual("int main ( int leet ) { }");
});

test("it emits var declare", () => {
    const cgp = new CCodeGenPass();
    cgp.visitVarDeclareStmt(
        new VarDeclareStatement(
            "test",
            new Type(false, "string"),
            new String("test")
        )
    );
    expect(cgp.valueStack.pop()).toEqual(`string test = "test" ;`);
});
test("it emits fn call", () => {
    const cgp = new CCodeGenPass();
    cgp.visitFnCallStmt(
        new FunctionCallStatement("test", [new Int(1337), new String("leet")])
    );
    expect(cgp.valueStack.pop()).toEqual(`test ( 1337 , "leet" ) ;`);
});
test("it emits import", () => {
    const cgp = new CCodeGenPass();
    cgp.visitImport(new Import(new String("stdio.h")));
    expect(cgp.valueStack.pop()).toEqual(`#include "stdio.h"`);
});
