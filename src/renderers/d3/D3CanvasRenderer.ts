import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Canvas } from '../../components/Canvas'
import { D3AxisRenderer } from './D3AxisRenderer'

class D3CanvasRenderer extends D3ComponentRenderer<Canvas> {
  axisRenderers: D3AxisRenderer[] = []
  bg: SVGRectElement | null = null

  create(parent: SVGGElement): D3CanvasRenderer {
    this.svg = d3.select(parent).append('svg').attr('class', 'plot').node()
    this.bg = d3.select(this.svg).append('rect').node()

    this.axisRenderers = this.component.axes.map((axis) =>
      new D3AxisRenderer(axis).create(this.svg!)
    )
    return this
  }
  update() {
    d3.select(this.bg)
      .attr('x', this.component.position[0])
      .attr('y', this.component.position[1])
      .attr('width', this.component.size[0])
      .attr('height', this.component.size[1])
      .attr('fill', this.component.data.background)
    this.axisRenderers.forEach((r) => r.update())
  }
}

export { D3CanvasRenderer }
