import { vectors } from '../helpers/vectors'
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
    return vectors.add(this.parent.position, [
      this.data.margins[3],
      this.data.margins[0]
    ])
  }
  get size(): [number, number] {
    return vectors.sub(this.parent.size, [
      this.data.margins[1] + this.data.margins[3],
      this.data.margins[0] + this.data.margins[2]
    ])
  }
}

export { Plot }
