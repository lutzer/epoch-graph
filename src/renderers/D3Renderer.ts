import { Axis } from "../components/Axis";
import { Figure } from "../components/Figure";
import { Plot } from "../components/Plot";
import { BaseComponentRenderer, BaseRenderer } from "./BaseRenderer";

class D3Renderer implements BaseRenderer{
    getAxisRenderer(): BaseComponentRenderer<Axis> {
        throw new Error("Method not implemented.");
    }
    getPlotRenderer(): BaseComponentRenderer<Plot> {
        throw new Error("Method not implemented.");
    }
    getFigureRenderer(): BaseComponentRenderer<Figure> {
        return new D3FigureRenderer();
    }
}

class D3FigureRenderer implements BaseComponentRenderer<Figure> {
    render(component: Figure): void {
        console.log(component)
    }
    
}


export { D3Renderer }