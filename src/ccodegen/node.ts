import { CType, CSymbol } from "./consts";
import CBuilder from "./builder";

export default abstract class CNode {
    static proto(returnType: CType, id: string) {
        return new CBuilder()
            .add(returnType)
            .add(id)
            .add(CSymbol.ParenL)
            .add(CSymbol.ParenR);
    }
    // TODO: Add args and stuff
}
