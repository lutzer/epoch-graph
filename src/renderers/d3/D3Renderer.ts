import { Figure } from '../../components/Figure'
import { BaseRenderer } from '../BaseRenderer'
import * as d3 from 'd3'
import { D3FigureRenderer } from './D3FigureRenderer'

class D3Renderer implements BaseRenderer {
  svg: SVGSVGElement | null = null
  figureRenderer: D3FigureRenderer | null = null

  constructor(public container: HTMLElement) {}

  setup(figure: Figure): void {
    this.svg = d3
      .select(this.container)
      .append('svg')
      .attr('width', figure.size[0])
      .attr('height', figure.size[1])
      .node()
    this.figureRenderer = new D3FigureRenderer(figure).create(this.svg!)
  }

  update(): void {
    this.figureRenderer?.update()
  }
}

export { D3Renderer }
