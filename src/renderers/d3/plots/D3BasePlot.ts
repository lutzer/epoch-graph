import { ScaleLinear } from 'd3-scale'
import { Plot } from '../../../components/Plot'
import { scaleUtils } from '../../../helpers/scaleUtils'

abstract class D3BasePlot {
  static getScale(
    plot: Plot,
    coord: number
  ): ScaleLinear<number, number, never> {
    const range: [number, number] =
      coord == 0 ? [0, plot.size[coord]] : [plot.size[coord], 0]

    return scaleUtils.createScale(
      plot.parent.getDomain(coord),
      range,
      plot.parent.getScale(coord).scaleType
    )
  }
}

export { D3BasePlot }
