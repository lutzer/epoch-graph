import { PlotData } from '../models/FigureData'
import { Axis } from './Axis'
import { BaseComponent } from './BaseComponent'
import { Figure } from './Figure'
import { RenderComponent } from './RenderComponent'

class Plot extends BaseComponent<PlotData> implements RenderComponent {
  axes: Axis[] = []

  constructor(
    data: PlotData,
    public parent: Figure
  ) {
    super(data)
    this.axes = data.axes.map((a) => new Axis(a, this))
  }

  get position(): [number, number] {
    return this.parent.position
  }
  get size(): [number, number] {
    return this.parent.size
  }
}

export { Plot }
