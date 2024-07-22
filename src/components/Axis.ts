import { AxisData } from '../schemas/FigureData'
import { BaseComponent } from './BaseComponent'
import { Plot } from './Plot'

class Axis extends BaseComponent<AxisData> {
  constructor(public parent: Plot) {
    super()
  }

  fromJson(json: AxisData): Axis {
    this._data = json
    return this
  }
}

export { Axis }
