import * as d3 from 'd3'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { Plot } from '../../components/Plot'

class D3PlotRenderer extends D3ComponentRenderer<Plot> {
  create(parent: SVGSVGElement): D3PlotRenderer {
    this.svg = d3.select(parent).attr('class', 'plot').node()
    console.log(this.component)
    return this
  }
  update() {
    console.log(this.component)
  }
}

export { D3PlotRenderer }
