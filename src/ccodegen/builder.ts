import { CEntity } from "./consts";

export default class CBuilder {
    str: string = "";
    add(n: CEntity, space: boolean = true) {
        this.str += space ? n + " " : n
        return this;
    }
    toString() {
        return this.str.trimRight()
    }
}
