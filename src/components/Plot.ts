import { BasePlotData, PlotType } from '../models/PlotData'
import { BaseComponent } from './BaseComponent'
import { Canvas } from './Canvas'
import { RenderComponent } from './RenderComponent'

class Plot extends BaseComponent<BasePlotData> implements RenderComponent {
  constructor(
    data: BasePlotData,
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
