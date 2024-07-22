import { Figure } from '../../components/Figure'
import { BaseRenderer } from '../BaseRenderer'
import * as d3 from 'd3'
import { D3FigureRenderer } from './D3FigureRenderer'

class D3Renderer extends BaseRenderer {
  svg: SVGSVGElement | null
  figureRenderer: D3FigureRenderer | null = null

  constructor(container: HTMLElement) {
    super(container)
    this.svg = d3.select(container).append('svg').node()
  }

  override setup(figure: Figure): void {
    this.figureRenderer = new D3FigureRenderer(figure).create(this.svg!)
  }

  override update(): void {
    this.figureRenderer?.update()
  }
}

export { D3Renderer }
