import { vectors } from '../helpers/vectors'
import { AxisScaleType, CanvasData, CanvasScale } from '../models/FigureData'
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

  getDomain(coord: number): [number, number] {
    const scale = this.getScale(coord)
    if (
      scale.scaleType == AxisScaleType.LOGARITHMIC &&
      (scale.domain[0] <= 0 || scale.domain[1] <= 0)
    )
      throw Error('domain for log plot must be positive')
    return scale.domain
  }

  getScale(coord: number): CanvasScale {
    return coord == 0 ? this.data.xScale : this.data.yScale
  }
}

export { Canvas }
