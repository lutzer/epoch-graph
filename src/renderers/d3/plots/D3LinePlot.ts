import * as d3 from 'd3'
import { DataPoint, LinePlotData } from '../../../models/PlotData'
import { Plot } from '../../../components/Plot'
import { D3BasePlot } from './D3BasePlot'

class D3LinePlot extends D3BasePlot {
  static render(svg: SVGGElement, component: Plot, data: LinePlotData) {
    d3.select(svg).selectAll('*').remove()

    const xScale = this.getScale(component, 0)
    const yScale = this.getScale(component, 1)

    // plot line
    const lineFunc = d3
      .line<DataPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

    d3.select(svg)
      .append('path')
      .attr(
        'transform',
        `translate(${component.position[0]},${component.position[1]})`
      )
      .style('stroke', data.color)
      .style('stroke-width', data.strokeWidth)
      .style('fill', 'none')
      .datum(data)
      .attr('d', lineFunc(data.points))
  }
}

export { D3LinePlot }
