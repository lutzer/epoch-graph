import { AxisData, AxisPosition } from '../models/FigureData'
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
    return this.parent.position
  }

  get size(): [number, number] {
    return this.parent.size
  }

  get ticks(): number[] {
    return []
  }

  get domain(): [number, number] {
    return this.data.domain
  }

  get range(): [number, number] {
    return [0, 0]
  }

  get coord(): number {
    return this.data.position == AxisPosition.TOP || AxisPosition.BOTTOM ? 0 : 1
  }
}

export { Axis }
