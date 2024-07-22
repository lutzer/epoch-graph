import { BaseRenderer } from "../renderers/BaseRenderer";
import { BaseComponent } from "./BaseComponent";
import { Figure } from "./Figure";

class Axis implements BaseComponent {
    parent: Figure;

    constructor(parent: Figure) {
        this.parent = parent;
    }

    draw(renderer: BaseRenderer): void {
        renderer.getAxisRenderer().render(this);
    }

}

export { Axis }