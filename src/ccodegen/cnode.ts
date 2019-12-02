import {CType, CSymbol} from "./consts";
import CBuilder from "./builder";
import Statement from "../parsing/statement";

export default abstract class CNode {
    static proto(returnType: CType, id: string) {
        return new CBuilder()
            .add(returnType)
            .add(id)
            .add(CSymbol.ParenL)
            .add(CSymbol.ParenR);
    }
    static block(statements: CBuilder[]) {
        const builder: CBuilder = new CBuilder().add(CSymbol.BraceL);

        for (const statement of statements) {
            builder.add(Statement.toString());
        }

        return builder.add(CSymbol.BraceR);
    }
    static string(value: string) {
        return new CBuilder().add(CSymbol.DubQuote, false).add(value, false).add(CSymbol.DubQuote)
    }

    static fn(proto: CBuilder, body: CBuilder) {
        return new CBuilder().add(proto.toString()).add(body.toString())
    }
    // TODO: Add args and stuff
}
