import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Axis } from '../../components/Axis'
import { AxisPosition, AxisScaleType } from '../../models/FigureData'

class D3AxisRenderer extends D3ComponentRenderer<Axis> {
  grid: SVGGElement | null = null
  axis: SVGGElement | null = null

  create(parent: SVGGElement): D3AxisRenderer {
    const classprefix = this.component.coord == 1 ? 'x' : 'y'
    this.svg = d3
      .select(parent)
      .append('g')
      .attr('class', `axis-container`)
      .node()
    this.grid = d3
      .select(this.svg)
      .append('g')
      .attr('class', `grid ${classprefix}-grid`)
      .node()
    this.axis = d3
      .select(this.svg)
      .append('g')
      .attr('class', `axis ${classprefix}-grid`)
      .node()
    return this
  }
  update() {
    d3.select(this.svg).attr(
      'transform',
      `translate(${this.component.position[0]},${this.component.position[1]})`
    )

    const ticks = this.component.ticks
    const range =
      this.component.coord == 0
        ? [0, this.component.size[this.component.coord]]
        : [this.component.size[this.component.coord], 0]

    const scale =
      this.component.scale.scaleType == AxisScaleType.LINEAR
        ? d3.scaleLinear().range(range).domain(this.component.scale.domain)
        : d3.scaleLog().range(range).domain(this.component.scale.domain)

    const axisGenerator = this.axisPositionFunc()
    const axisSvg = axisGenerator(scale).tickValues(ticks).tickSizeOuter(0)

    const xOffset =
      this.component.axisPosition == AxisPosition.RIGHT
        ? this.component.size[0]
        : 0
    const yOffset =
      this.component.axisPosition == AxisPosition.BOTTOM
        ? this.component.size[1]
        : 0

    d3.select(this.axis!)
      .attr('transform', `translate(${xOffset},${yOffset})`)
      .call(axisSvg)

    // render grid
    this.renderGrid(ticks, scale)
  }

  renderGrid(ticks: number[], scale: d3.ScaleLinear<number, number, never>) {
    // generate lines for x axis
    const p1: [number, number] = [0, 0]
    const p2: [number, number] =
      this.component.coord == 0
        ? [0, this.component.size[1]]
        : [this.component.size[0], 0]

    const line = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1])([p1, p2])

    d3.select(this.grid).selectAll('*').remove()
    ticks.forEach((t) => {
      d3.select(this.grid)
        .append('path')
        .attr('stroke', this.component.data.grid.color)
        .attr(
          'transform',
          this.component.coord == 0
            ? `translate(${scale(t)},0)`
            : `translate(0, ${scale(t)})`
        )
        .attr('d', line)
    })
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
