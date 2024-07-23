type BaseData = object

type FigureData = BaseData & {
  width: number
  height: number
  plots: PlotData[]
}

type PlotData = BaseData & {
  title: string
  margins: [number, number, number, number] // top, right, bottom, left
  axes: AxisData[]
  background: string
}

type AxisData = BaseData & {
  position: AxisPosition
  scale: AxisScale
  grid: {
    visible: boolean
    color: string
  }
  domain: [number, number]
  lim: [number, number]
  ticks: {
    numberOfTicks: number
  }
}

enum AxisScale {
  LINEAR,
  LOGARITHMIC
}

enum AxisPosition {
  TOP,
  LEFT,
  BOTTOM,
  RIGHT
}

export type { BaseData, FigureData, AxisData, PlotData }
export { AxisPosition, AxisScale }
