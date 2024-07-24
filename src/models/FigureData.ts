import { BasePlotData } from './PlotData'

type BaseData = object

type FigureData = BaseData & {
  width: number
  height: number
  canvases: CanvasData[]
}

type CanvasData = BaseData & {
  title: string
  margins: [number, number, number, number] // top, right, bottom, left
  axes: AxisData[]
  background: string
  plots: BasePlotData[]
  xScale: CanvasScale
  yScale: CanvasScale
}

type AxisData = BaseData & {
  position: AxisPosition
  grid: {
    visible: boolean
    color: string
  }
  ticks: {
    numberOfTicks: number
    values: number[]
  }
}

type CanvasScale = {
  scaleType: AxisScaleType
  domain: [number, number]
  lim: [number, number]
}

enum AxisScaleType {
  LINEAR,
  LOGARITHMIC
}

enum AxisPosition {
  TOP,
  LEFT,
  BOTTOM,
  RIGHT
}

export type { BaseData, FigureData, AxisData, CanvasData, CanvasScale }
export { AxisPosition, AxisScaleType }
