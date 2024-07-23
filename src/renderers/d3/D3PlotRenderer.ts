import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Plot } from '../../components/Plot'
import { D3AxisRenderer } from './D3AxisRenderer'

class D3PlotRenderer extends D3ComponentRenderer<Plot> {
  axisRenderers: D3AxisRenderer[] = []

  create(parent: SVGSVGElement): D3PlotRenderer {
    this.svg = d3.select(parent).append('svg').attr('class', 'plot').node()
    this.axisRenderers = this.component.axes.map((axis) =>
      new D3AxisRenderer(axis).create(this.svg!)
    )
    return this
  }
  update() {
    this.axisRenderers.forEach((r) => r.update())
  }
}

export { D3PlotRenderer }
