import CCodeGenPass from "../passes/ccodegenpass";
import Prototype from "../parsing/prototype";
import Type from "../parsing/type";

test("it emits C proto", () => {
    const cgp = new CCodeGenPass();
    cgp.visitPrototype(new Prototype("main", [], new Type(true, "void")));
    expect(cgp.valueStack.pop()).toEqual("void main ( )")
});

test.todo("it emits fn")
test.todo("it emits var declare")
test.todo("it emits fn call")
test.todo("it emits import");