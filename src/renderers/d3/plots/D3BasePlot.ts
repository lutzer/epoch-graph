import { ScaleLinear } from 'd3-scale'
import { Plot } from '../../../components/Plot'
import { scale } from '../../../helpers/scale'

abstract class D3BasePlot {
  static getScale(plot: Plot, dim: number): ScaleLinear<number, number, never> {
    const range: [number, number] =
      dim == 0 ? [0, plot.size[dim]] : [plot.size[dim], 0]

    return scale.createScale(
      dim == 0 ? plot.parent.xScale.domain : plot.parent.yScale.domain,
      range,
      dim == 0 ? plot.parent.xScale.scaleType : plot.parent.yScale.scaleType
    )
  }
}

export { D3BasePlot }
