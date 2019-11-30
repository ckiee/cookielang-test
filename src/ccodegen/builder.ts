import { CEntity } from "./consts";

export default class CBuilder {
    nodes: CEntity[] = [];
    add(n: CEntity) {
        this.nodes.push(n);
        return this;
    }
    toString() {
        return this.nodes.join(" ");
    }
}
