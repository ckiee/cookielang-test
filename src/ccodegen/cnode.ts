import {CType, CSymbol} from "./consts";
import CBuilder from "./builder";

export default abstract class CNode {
    static proto(returnType: CType, id: string) {
        return new CBuilder()
            .add(returnType)
            .add(id)
            .add(CSymbol.ParenL)
            .add(CSymbol.ParenR);
    }
    static block(statements: string[]) {
        const builder: CBuilder = new CBuilder().add(CSymbol.BraceL);

        for (const statement of statements) {
            builder.add(statement);
        }

        return builder.add(CSymbol.BraceR);
    }
    static string(value: string) {
        return new CBuilder().add(CSymbol.DubQuote, false).add(value, false).add(CSymbol.DubQuote)
    }

    static fn(proto: string, body: string) {
        return new CBuilder().add(proto.toString()).add(body.toString())
    }

    static varDeclare(vType: string, id: string, value?: string) {
        const builder = new CBuilder().add(vType).add(id);

        if (value !== undefined) {
            builder.add(CSymbol.Equal).add(value);
        }

        return builder.add(CSymbol.SemiColon);
    }
    // TODO: Add args and stuff
}
