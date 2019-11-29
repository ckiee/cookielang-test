import TokenStream from "../tokenstream";
import Int from "./int";
import BitSize from "../bitsize";
import Type from "./type";

export default class Parser {
    ts: TokenStream;
    constructor(ts: TokenStream) {
        this.ts = ts;
    }
    parseInt(): Int {
        return new Int(BitSize.B64, false, parseInt(this.ts.get().match));
    }
    parseType(): Type {
        if (this.ts.get().type == "keywordMut") {
            if (this.ts.peek().type !== "identifier")
                throw new Error(
                    "expected identifier but got " + this.ts.peek().type
                );
            return new Type(true, this.ts.next().match);
        } else {
            if (this.ts.get().type !== "identifier")
                throw new Error(
                    "expected identifier but got " + this.ts.get().type
                );

            return new Type(false, this.ts.get().match);
        }
    }
}
