import * as d3 from 'd3'
import { Plot } from '../../components/Plot'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { LinePlotData, ScatterPlotData } from '../../models/PlotData'
import { D3LinePlot } from './plots/D3LinePlot'
import { D3ScatterPlot } from './plots/D3ScatterPlot'

class D3PlotRenderer extends D3ComponentRenderer<Plot> {
  create(parent: SVGGElement): D3ComponentRenderer<Plot> {
    this.svg = d3
      .select(parent)
      .append('svg')
      .attr('class', `plot ${this.component.data.type}`)
      .node()
    return this
  }
  update(): void {
    d3.select(this.svg)
      .attr('x', this.component.position[0])
      .attr('y', this.component.position[1])
      .attr('width', this.component.size[0])
      .attr('height', this.component.size[1])
    if (this.component.data.type == 'line') {
      D3LinePlot.render(
        this.svg!,
        this.component,
        this.component.data as LinePlotData
      )
    } else if (this.component.data.type == 'scatter') {
      D3ScatterPlot.render(
        this.svg!,
        this.component,
        this.component.data as ScatterPlotData
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
