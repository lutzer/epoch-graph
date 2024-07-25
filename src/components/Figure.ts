import { BaseRenderer } from '../renderers/BaseRenderer'
import { D3Renderer } from '../renderers/d3/D3Renderer'
import { FigureData } from '../models/FigureData'
import { Canvas } from './Canvas'
import { Mpld3Parser } from '../parser/Mpld3Parser'
import { RenderComponent } from './RenderComponent'
import { Mpld3Data } from '../parser/Mpld3Data'
import { defaultFigureStyle, FigureStyle } from '../models/StyleData'

class Figure implements RenderComponent {
  _data: FigureData | null = null
  _style: FigureStyle = defaultFigureStyle

  canvases: Canvas[] = []

  constructor(
    public engine: BaseRenderer,
    public options: FigureOptions
  ) {}

  get position(): [number, number] {
    return [0, 0]
  }
  get size(): [number, number] {
    return [this.data?.width ?? 512, this.data?.height ?? 512]
  }
  set size(size: [number, number]) {
    if (this.data == null) return
    this.data.width = size[0]
    this.data.height = size[1]
  }

  set style(style: FigureStyle) {
    this._style = style
  }

  get style(): FigureStyle {
    return this._style
  }

  set data(data: FigureData) {
    this._data = data
    this.canvases = data.canvases.map((p) => new Canvas(p, this))
  }

  get data(): FigureData | null {
    return this._data
  }

  static d3(container: HTMLElement, options: FigureOptions): Figure {
    return new Figure(new D3Renderer(container), options)
  }

  fromMpld3(json: Mpld3Data) {
    this.data = Mpld3Parser.parse(json)
  }

  show(): void {
    this.engine.setup(this)
    this.engine.update()
  }

  update(): void {
    this.engine.update()
  }
}

type FigureOptions = {
  reponsive: boolean
}

export { Figure }
