import { vectors } from '../helpers/vectors'
import { CanvasData, CanvasScale } from '../models/FigureData'
import { Axis } from './Axis'
import { BaseComponent } from './BaseComponent'
import { Figure } from './Figure'
import { Plot } from './Plot'
import { RenderComponent } from './RenderComponent'

class Canvas extends BaseComponent<CanvasData> implements RenderComponent {
  axes: Axis[] = []
  plots: Plot[] = []

  constructor(
    data: CanvasData,
    public parent: Figure
  ) {
    super(data)
    this.axes = data.axes.map((a) => new Axis(a, this))
    this.plots = data.plots.map((p) => new Plot(p, this))
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

  get xScale(): CanvasScale {
    return this.data.xScale
  }

  get yScale(): CanvasScale {
    return this.data.yScale
  }
}

export { Canvas }
