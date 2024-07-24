import * as d3 from 'd3'
import {
  DataPoint,
  LinePlotData,
  ScatterPlotData
} from '../../../models/PlotData'
import { Plot } from '../../../components/Plot'
import { D3BasePlot } from './D3BasePlot'

class D3ScatterPlot extends D3BasePlot {
  static render(svg: SVGGElement, component: Plot, data: ScatterPlotData) {
    const xScale = this.getScale(component, 0)
    const yScale = this.getScale(component, 1)

    // generate data for circles
    const circleData = data.points.map((p, i) => ({
      cx: xScale(p.x),
      cy: yScale(p.y),
      r: data.sizes[i % data.sizes.length],
      fillColor: data.fillColors[i % data.fillColors.length],
      strokeColor: data.strokeColors[i % data.strokeColors.length],
      strokeWidth: data.strokeWidths[i % data.strokeWidths.length]
    }))

    d3.select(svg).selectAll('*').remove()

    d3.select(svg)
      .selectAll('*')
      .data(circleData)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('r', (d) => d.r)
      .attr('fill', (d) => d.fillColor)
      .attr('stroke', (d) => d.strokeColor)
      .attr('stroke-width', (d) => d.strokeWidth)
      .exit()
  }
}

export { D3ScatterPlot }
