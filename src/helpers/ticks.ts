import { scaleLinear } from 'd3-scale'

class ticks {
  static generateTicks(domain: [number, number], numberOfTicks: number) {
    const scale = scaleLinear().domain(domain).nice()
    const ticks = scale.ticks(numberOfTicks)
    return ticks.filter((tick) => tick >= domain[0] && tick <= domain[1])
  }
}

export { ticks }
