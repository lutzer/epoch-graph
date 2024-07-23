import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Axis } from '../../components/Axis'

class D3AxisRenderer extends D3ComponentRenderer<Axis> {
  create(parent: SVGSVGElement): D3AxisRenderer {
    this.svg = d3.select(parent).append('svg').attr('class', 'axis').node()
    return this
  }
  update() {
    d3.select(this.svg)
      .attr('x', this.component.position[0])
      .attr('y', this.component.position[1])
      .attr('width', this.component.size[0])
      .attr('height', this.component.size[1])

    // if ()
  }
}

export { D3AxisRenderer }
