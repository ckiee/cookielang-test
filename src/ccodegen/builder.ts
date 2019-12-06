import { CEntity } from "./consts";

export default class CBuilder {
    str: string = "";
    add(n: CEntity, space: boolean = true) {
        this.str += n;
        if (space) this.str += " ";
        return this;
    }
    toString() {
        return this.str.trimRight();
    }
}
