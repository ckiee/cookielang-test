import TokenStream from "../tokenstream";

export default class Parser {
    ts: TokenStream;
    constructor(ts: TokenStream) {
        this.ts = ts;
    }
}
