import * as d3 from 'd3'
import { DataPoint, LinePlotData } from '../../../models/PlotData'
import { Plot } from '../../../components/Plot'
import { scale } from '../../../helpers/scale'

class D3LinePlot {
  static render(svg: SVGGElement, component: Plot, data: LinePlotData) {
    d3.select(svg)
      .selectAll('*')
      .remove()
      .attr(
        'transform',
        `translate(${component.position[0]},${component.position[1]})`
      )

    const xRange: [number, number] = [0, component.size[0]]
    const yRange: [number, number] = [0, component.size[1]]

    const xScale = scale.createScale(
      component.parent.xScale.domain,
      xRange,
      component.parent.xScale.scaleType
    )

    const yScale = scale.createScale(
      component.parent.yScale.domain,
      yRange,
      component.parent.yScale.scaleType
    )

    // plot line
    const lineFunc = d3
      .line<DataPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

    d3.select(svg).datum(data).attr('d', lineFunc(data.points))
  }
}

export { D3LinePlot }
