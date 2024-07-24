import { ScaleLinear } from 'd3-scale'
import { Plot } from '../../../components/Plot'
import { scale } from '../../../helpers/scale'

abstract class D3BasePlot {
  static getScale(
    plot: Plot,
    coord: number
  ): ScaleLinear<number, number, never> {
    const range: [number, number] =
      coord == 0 ? [0, plot.size[coord]] : [plot.size[coord], 0]

    return scale.createScale(
      coord == 0 ? plot.parent.xScale.domain : plot.parent.yScale.domain,
      range,
      coord == 0 ? plot.parent.xScale.scaleType : plot.parent.yScale.scaleType
    )
  }
}

export { D3BasePlot }
