import { scaleLinear } from 'd3-scale'

class ticks {
  static generateTicks(domain: [number, number], numberOfTicks: number) {
    const scale = scaleLinear().domain(domain).nice()
    const ticks = scale.ticks(numberOfTicks)
    return ticks
  }
}

export { ticks }
