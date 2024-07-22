import { FigureJson } from "../schemas/FigureJson";

class Figure {

    container : HTMLElement;


    constructor(container: HTMLElement) {
        this.container = container
    }

    public loadJson(json: FigureJson) {
        console.log(json)
    }

    public show() {

    }
}

export { Figure }