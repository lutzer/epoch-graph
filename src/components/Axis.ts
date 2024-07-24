import { scale } from '../helpers/scale.ts'
import { vectors } from '../helpers/vectors'
import { AxisData, AxisPosition, CanvasScale } from '../models/FigureData.ts'
import { BaseComponent } from './BaseComponent'
import { Canvas } from './Canvas.ts'
import { RenderComponent } from './RenderComponent'

class Axis extends BaseComponent<AxisData> implements RenderComponent {
  constructor(
    data: AxisData,
    public parent: Canvas
  ) {
    super(data)
  }

  get position(): [number, number] {
    return this.parent.position
  }

  get size(): [number, number] {
    return this.parent.size
  }

  get ticks(): number[] {
    return scale.generateTicks(this.scale.domain, this.data.ticks.numberOfTicks)
  }

  get scale(): CanvasScale {
    return this.coord == 0 ? this.parent.xScale : this.parent.yScale
  }

  get axisPosition(): AxisPosition {
    return this.data.position
  }

  // returns if this axis defines the x coord = 0 or the y coord = 1
  get coord(): number {
    return this.data.position == AxisPosition.TOP ||
      this.data.position == AxisPosition.BOTTOM
      ? 0
      : 1
  }
}

export { Axis }
