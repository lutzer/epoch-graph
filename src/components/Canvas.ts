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

  constructor(data: CanvasData, figure: Figure) {
    super(data, figure)
    this.axes = data.axes.map((a) => new Axis(a, this, this.figure))
    this.plots = data.plots.map((p) => new Plot(p, this, this.figure))
  }

  get position(): [number, number] {
    const offset: [number, number] = [
      this.style.margins[3] + this.data.margins[3],
      this.style.margins[0] + this.data.margins[0]
    ]
    return vectors.add(this.figure.position, offset)
  }
  get size(): [number, number] {
    const space: [number, number] = [
      this.style.margins[1] +
        this.style.margins[3] +
        this.data.margins[1] +
        this.data.margins[3],
      this.style.margins[0] +
        this.style.margins[2] +
        this.data.margins[0] +
        this.data.margins[2]
    ]
    return vectors.sub(this.figure.size, space)
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
