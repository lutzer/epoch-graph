import { ScaleLinear, scaleLinear, scaleLog } from 'd3-scale'
import { AxisScaleType } from '../models/FigureData'

class scale {
  static generateTicks(domain: [number, number], numberOfTicks: number) {
    const scale = scaleLinear().domain(domain).nice()
    const ticks = scale.ticks(numberOfTicks)
    return ticks.filter((tick) => tick >= domain[0] && tick <= domain[1])
  }

  static createScale(
    domain: [number, number],
    range: [number, number],
    type: AxisScaleType
  ): ScaleLinear<number, number, never> {
    return type == AxisScaleType.LINEAR
      ? scaleLinear(range).domain(domain)
      : scaleLog(range).domain(domain)
  }
}

export { scale }
