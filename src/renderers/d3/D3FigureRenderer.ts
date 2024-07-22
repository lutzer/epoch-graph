import * as d3 from 'd3'
import { Figure } from '../../components/Figure'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { D3PlotRenderer } from './D3PlotRenderer'

class D3FigureRenderer extends D3ComponentRenderer<Figure> {
  plotRenderers: D3PlotRenderer[] = []

  create(parent: SVGSVGElement): D3FigureRenderer {
    this.svg = d3.select(parent).attr('class', 'figure').node()
    this.plotRenderers = this.component.plots.map((plot) =>
      new D3PlotRenderer(plot).create(this.svg!)
    )
    return this
  }
  update() {
    d3.select(this.svg)
      .attr('width', this.component.width)
      .attr('height', this.component.height)
    this.plotRenderers.forEach((p) => p.update())
  }
}

export { D3FigureRenderer }
