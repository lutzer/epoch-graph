import { BasePlot, PlotType } from '../models/PlotData'
import { BaseComponent } from './BaseComponent'
import { Canvas } from './Canvas'
import { RenderComponent } from './RenderComponent'

class Plot extends BaseComponent<BasePlot> implements RenderComponent {
  constructor(
    data: BasePlot,
    public parent: Canvas
  ) {
    super(data)
  }

  get type(): PlotType {
    return this.data.type
  }

  get position(): [number, number] {
    return this.parent.position
  }
  get size(): [number, number] {
    return this.parent.size
  }
}

export { Plot }
