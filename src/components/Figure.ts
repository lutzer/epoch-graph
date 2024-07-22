import { BaseRenderer } from '../renderers/BaseRenderer'
import { D3Renderer } from '../renderers/d3/D3Renderer'
import { FigureData } from '../schemas/FigureData'
import { BaseComponent } from './BaseComponent'
import { Plot } from './Plot'

class Figure extends BaseComponent<FigureData> {
  engine: BaseRenderer
  plots: Plot[] = []

  constructor(
    container: HTMLElement,
    engine: typeof BaseRenderer = D3Renderer
  ) {
    super()
    this.engine = new engine(container)
  }

  get width() {
    return this._data?.width ?? 512
  }
  get height() {
    return this._data?.height ?? 512
  }

  public fromJson(json: FigureData): Figure {
    this._data = json
    this.plots = json.axes.map((p) => new Plot(this).fromJson(p))
    return this
  }

  show(): void {
    this.engine.setup(this)
    this.engine.update(this)
  }
}

export { Figure }
