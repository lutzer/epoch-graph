import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Axis } from '../../components/Axis'
import { AxisPosition, AxisScale } from '../../models/FigureData'

class D3AxisRenderer extends D3ComponentRenderer<Axis> {
  create(parent: SVGSVGElement): D3AxisRenderer {
    this.svg = d3.select(parent).append('svg').attr('class', 'axis').node()
    return this
  }
  update() {
    d3.select(this.svg)
      .attr('x', this.component.position[0])
      .attr('y', this.component.position[1])

    const range = [0, this.component.size[this.component.coord]]

    const scale =
      this.component.scale == AxisScale.LINEAR
        ? d3.scaleLinear().range(range).domain(this.component.domain)
        : d3.scaleLog().range(range).domain(this.component.domain)

    const axisGenerator = this.axisPositionFunc()
    const axisSvg = axisGenerator(scale)
      .tickValues(this.component.ticks)
      .tickSizeOuter(0)

    d3.select(this.svg!).call(axisSvg)
  }

  axisPositionFunc(): <Domain extends d3.AxisDomain>(
    scale: d3.AxisScale<Domain>
  ) => d3.Axis<Domain> {
    switch (this.component.axisPosition) {
      case AxisPosition.BOTTOM:
        return d3.axisBottom
      case AxisPosition.TOP:
        return d3.axisTop
      case AxisPosition.LEFT:
        return d3.axisLeft
      case AxisPosition.RIGHT:
        return d3.axisRight
    }
  }
}

export { D3AxisRenderer }
