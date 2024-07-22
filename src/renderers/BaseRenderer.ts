
import { Axis } from "../components/Axis";
import { BaseComponent } from "../components/BaseComponent";
import { Figure } from "../components/Figure";
import { Plot } from "../components/Plot";

abstract class BaseRenderer{
    abstract getFigureRenderer() : BaseComponentRenderer<Figure>
    abstract getPlotRenderer() : BaseComponentRenderer<Plot>
    abstract getAxisRenderer() : BaseComponentRenderer<Axis>
}

abstract class BaseComponentRenderer<T extends BaseComponent> {
    abstract render(component: T) : void
}

export { BaseRenderer, BaseComponentRenderer }