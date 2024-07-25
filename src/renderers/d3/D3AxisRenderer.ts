import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Axis } from '../../components/Axis'
import { AxisPosition, AxisScaleType } from '../../models/FigureData'

class D3AxisRenderer extends D3ComponentRenderer<Axis> {
  grid: SVGGElement | null = null
  axis: SVGGElement | null = null
  label: SVGTextElement | null = null

  create(parent: SVGGElement): D3AxisRenderer {
    const classprefix = this.component.coord == 0 ? 'x' : 'y'
    this.svg = d3
      .select(parent)
      .append('svg')
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
      .attr('class', `axis ${classprefix}-axis`)
      .node()
    this.label = d3
      .select(this.svg)
      .append('text')
      .attr('class', `axis-label ${classprefix}-axis`)
      .node()
    return this
  }

  update() {
    d3.select(this.svg)
      .attr('x', this.component.position[0])
      .attr('y', this.component.position[1])
      .attr('width', this.component.size[0])
      .attr('height', this.component.size[1])
      .style('overflow', 'visible')

    const ticks = this.component.ticks
    const range =
      this.component.coord == 0
        ? [0, this.component.size[this.component.coord]]
        : [this.component.size[this.component.coord], 0]

    const scale =
      this.component.scale.scaleType == AxisScaleType.LINEAR
        ? d3.scaleLinear().range(range).domain(this.component.domain)
        : d3.scaleLog().range(range).domain(this.component.domain)

    const axisGenerator = this.axisPositionFunc()
    const axisSvg = axisGenerator(scale)
      .tickValues(ticks)
      .tickSizeOuter(0)
      .tickFormat((v) => {
        return this.component.isLogarithmic()
          ? new Number(v).toExponential(0)
          : v.toString()
      })
      .tickPadding(this.component.style.canvas.axis.ticks.spacing)

    // calculate offsets for axis on bottom or right
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

    // render label
    const style =
      this.component.coord == 0
        ? this.component.style.canvas.axis.xLabel
        : this.component.style.canvas.axis.yLabel
    d3.select(this.label!)
      .text(this.component.data.label)
      .attr('x', xOffset)
      .attr('y', yOffset)
      .style(
        'transform',
        `translate(${style.translate[0]},${style.translate[1]})`
      )
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

    const offsets = ticks.map((t) => ({
      x: this.component.coord == 0 ? scale(t) : 0,
      y: this.component.coord == 1 ? scale(t) : 0
    }))

    const gridLines = d3
      .select(this.grid)
      .selectAll<SVGPathElement, unknown>('path')
      .data(offsets)

    gridLines
      .enter()
      .append('path')
      .merge(gridLines)
      .attr('stroke', this.component.data.grid.color)
      .attr('d', line)
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
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
