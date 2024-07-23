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
    switch (this.axisPosition) {
      case AxisPosition.TOP:
      case AxisPosition.LEFT:
        return this.parent.position
      case AxisPosition.RIGHT:
        return vectors.add(this.parent.position, [this.parent.size[0], 0])
      case AxisPosition.BOTTOM:
        return vectors.add(this.parent.position, [0, this.parent.size[1]])
    }
  }

  get size(): [number, number] {
    return this.parent.size
  }

  get ticks(): number[] {
    return scale.generateTicks(this.scale.domain, this.data.ticks.numberOfTicks)
  }

  get range(): [number, number] {
    return [0, 0]
  }

  get scale(): CanvasScale {
    return this.coord == 0 ? this.parent.xScale : this.parent.yScale
  }

  get axisPosition(): AxisPosition {
    return this.data.position
  }

  get coord(): number {
    return this.data.position == AxisPosition.TOP ||
      this.data.position == AxisPosition.BOTTOM
      ? 0
      : 1
  }
}

export { Axis }
