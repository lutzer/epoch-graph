import { BaseRenderer } from '../renderers/BaseRenderer'
import { D3Renderer } from '../renderers/d3/D3Renderer'
import { FigureData } from '../models/FigureData'
import { RenderComponent } from './BaseComponent'
import { Plot } from './Plot'
import { Mpld3Data, Mpld3Parser } from '../parser/mpld3Parser'
import js from '@eslint/js'

class Figure implements RenderComponent {
  _data: FigureData | null = null

  plots: Plot[] = []

  constructor(public engine: BaseRenderer) {}

  get position(): [number, number] {
    return [0, 0]
  }
  get size(): [number, number] {
    return [this.data?.width ?? 512, this.data?.height ?? 512]
  }

  set data(data: FigureData) {
    this._data = data
    this.plots = data.plots.map((p) => new Plot(p, this))
  }

  get data(): FigureData | null {
    return this._data
  }

  static d3(container: HTMLElement): Figure {
    return new Figure(new D3Renderer(container))
  }

  fromMpld3(json: Mpld3Data) {
    this.data = Mpld3Parser.parse(json)
  }

  show(): void {
    this.engine.setup(this)
    this.engine.update()
  }
}

export { Figure }
