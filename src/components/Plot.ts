import { BaseRenderer } from "../renderers/BaseRenderer";
import { BaseComponent } from "./BaseComponent";
import { Figure } from "./Figure";

class Plot implements BaseComponent {
    parent: Figure

    constructor(parent: Figure) {
        this.parent = parent;
    }

    draw(renderer: BaseRenderer): void {
        renderer.getPlotRenderer().render(this);
    }
}

export { Plot }