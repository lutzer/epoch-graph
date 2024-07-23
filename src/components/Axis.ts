import { ticks } from '../helpers/ticks.ts'
import { vectors } from '../helpers/vectors'
import { AxisData, AxisPosition, AxisScale } from '../models/FigureData'
import { BaseComponent } from './BaseComponent'
import { Plot } from './Plot'
import { RenderComponent } from './RenderComponent'

class Axis extends BaseComponent<AxisData> implements RenderComponent {
  constructor(
    data: AxisData,
    public parent: Plot
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
    return ticks.generateTicks(this.domain, this.data.ticks.numberOfTicks)
  }

  get domain(): [number, number] {
    return this.data.domain
  }

  get range(): [number, number] {
    return [0, 0]
  }

  get scale(): AxisScale {
    return this.data.scale
  }

  get axisPosition(): AxisPosition {
    return this.data.position
  }

  get coord(): number {
    return this.data.position == AxisPosition.TOP || AxisPosition.BOTTOM ? 0 : 1
  }
}

export { Axis }
