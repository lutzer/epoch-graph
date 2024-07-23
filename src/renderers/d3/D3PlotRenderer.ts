import * as d3 from 'd3'
import { Plot } from '../../components/Plot'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { LinePlotData } from '../../models/PlotData'
import { D3LinePlot } from './plots/D3LinePlot'

class D3PlotRenderer extends D3ComponentRenderer<Plot> {
  create(parent: SVGGElement): D3ComponentRenderer<Plot> {
    this.svg = d3
      .select(parent)
      .append('g')
      .attr('class', `plot ${this.component.data.type}`)
      .node()
    return this
  }
  update(): void {
    if (this.component.data.type == 'line') {
      D3LinePlot.render(
        this.svg!,
        this.component,
        this.component.data as LinePlotData
      )
    } else {
      console.warn(
        'Renderer for this plot type is not implemented yet: ' +
          this.component.data.type
      )
    }
  }
}

export { D3PlotRenderer }
