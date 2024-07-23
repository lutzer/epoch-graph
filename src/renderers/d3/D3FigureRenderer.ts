import * as d3 from 'd3'
import { Figure } from '../../components/Figure'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { D3CanvasRenderer } from './D3CanvasRenderer'

class D3FigureRenderer extends D3ComponentRenderer<Figure> {
  canvasRenderers: D3CanvasRenderer[] = []

  create(parent: SVGGElement): D3FigureRenderer {
    this.svg = d3.select(parent).attr('class', 'figure').node()
    this.canvasRenderers = this.component.canvases.map((plot) =>
      new D3CanvasRenderer(plot).create(this.svg!)
    )
    return this
  }

  update() {
    d3.select(this.svg)
      .attr('width', this.component.size[0])
      .attr('height', this.component.size[1])
      .attr('viewBox', [0, 0, this.component.size[0], this.component.size[1]])
    this.canvasRenderers.forEach((c) => c.update())
  }

  resize(width: number, height: number) {
    if (this.component.size[0] !== width || this.component.size[1] !== height) {
      this.component.size = [width, height]
    }
  }
}

export { D3FigureRenderer }
