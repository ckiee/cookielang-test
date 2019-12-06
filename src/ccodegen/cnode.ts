import { CType, CSymbol } from "./consts";
import CBuilder from "./builder";
import Arg from "../parsing/arg";
import Type from "../parsing/type";
import Value, { ValueType } from "../parsing/value";
import Int from "../parsing/values/int";
import String from "../parsing/values/string";

export default abstract class CNode {
    static proto(returnType: CType, id: string) {
        return new CBuilder()
            .add(returnType)
            .add(id)
            .add(CSymbol.ParenL)
            .add(CSymbol.ParenR);
    }
    static type(type: Type) {
        return new CBuilder().add(type.value).toString();
    }
    static arg(arg: Arg) {
        return new CBuilder()
            .add(arg[0])
            .add(this.type(arg[1]))
            .toString();
    }
    static block(statements: string[]) {
        const builder: CBuilder = new CBuilder().add(CSymbol.BraceL);

        for (const statement of statements) {
            builder.add(statement);
        }

        return builder.add(CSymbol.BraceR).toString();
    }
    static string(value: String) {
        return new CBuilder()
            .add(CSymbol.DubQuote, false)
            .add(value.value, false)
            .add(CSymbol.DubQuote, false)
            .toString();
    }

    static fn(proto: string, body: string) {
        return new CBuilder()
            .add(proto.toString())
            .add(body.toString())
            .toString();
    }
    static int(node: Int) {
        return node.value.toString();
    }

    static value(value: Value) {
        switch (value.valueType) {
            case ValueType.Int:
                return this.int(<Int>value);
            case ValueType.String:
                return this.string(<String>value);
            default:
                throw new Error("unknown valuetype");
        }
    }
    static varDeclare(vType: string, id: string, value: string) {
        const builder = new CBuilder().add(vType).add(id);

        builder.add(CSymbol.Equal).add(value);

        return builder.add(CSymbol.SemiColon).toString();
    }
    static fnCall(id: string, args: Value[]) {
        const builder = new CBuilder().add(id).add(CSymbol.ParenL);
        for (let i in args) {
            const arg = args[i];
            builder.add(this.value(arg));
            if (args.length - 1 !== parseInt(i)) builder.add(CSymbol.Comma);
        }
        builder.add(CSymbol.ParenR).add(CSymbol.SemiColon);
        return builder.toString();
    }
}
