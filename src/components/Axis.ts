import { scaleUtils } from '../helpers/scaleUtils.ts'
import {
  AxisData,
  AxisPosition,
  AxisScaleType,
  CanvasScale
} from '../models/FigureData.ts'
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
    return this.data.ticks.values.length > 0
      ? this.data.ticks.values
      : scaleUtils.generateTicks(
          this.domain,
          this.data.ticks.numberOfTicks,
          this.scale.scaleType
        )
  }

  isLogarithmic(): boolean {
    return this.scale.scaleType == AxisScaleType.LOGARITHMIC
  }

  get domain(): [number, number] {
    return this.parent.getDomain(this.coord)
  }

  get scale(): CanvasScale {
    return this.parent.getScale(this.coord)
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
