import { Figure } from '../../components/Figure'
import { BaseRenderer } from '../BaseRenderer'
import * as d3 from 'd3'
import { D3FigureRenderer } from './D3FigureRenderer'

class D3Renderer implements BaseRenderer {
  svg: SVGSVGElement | null = null
  figureRenderer: D3FigureRenderer | null = null

  constructor(public container: HTMLElement) {}

  setup(figure: Figure): void {
    this.svg = d3.select(this.container).append('svg').node()
    this.figureRenderer = new D3FigureRenderer(figure).create(this.svg!)

    if (figure.options.reponsive) {
      const rect = this.container.getBoundingClientRect()
      this.figureRenderer?.resize(rect.width, rect.height)
      window.addEventListener('resize', this.onResize)
    }
  }

  update(): void {
    this.figureRenderer?.update()
  }

  onResize = () => {
    const rect = this.container.getBoundingClientRect()
    this.figureRenderer?.resize(rect.width, rect.height)
    this.update()
  }
}

export { D3Renderer }
