import { PlotData } from '../schemas/FigureData'
import { Axis } from './Axis'
import { BaseComponent } from './BaseComponent'
import { Figure } from './Figure'

class Plot extends BaseComponent<PlotData> {
  axes: Axis[] = []
  title: string = 'Test'

  fromJson(json: PlotData): Plot {
    this._data = json
    this.axes = json.axes.map((a) => new Axis(this).fromJson(a))
    return this
  }

  constructor(public parent: Figure) {
    super()
  }
}

export { Plot }
