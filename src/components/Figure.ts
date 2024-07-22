import { FigureJson } from "../schemas/FigureJson";
import { BaseComponent } from "./BaseComponent";

class Figure implements BaseComponent {

    container : HTMLElement
    axis: Axis[]


    constructor(container: HTMLElement) {
        this.container = container
    }

    public loadJson(json: FigureJson) {
        console.log(json)
    }


    draw(): void {
        this.container.htm
    }
}

export { Figure }