import { BaseData } from './FigureData'

type BasePlotData = BaseData & {
  points: DataPoint[]
  type: PlotType
}

type ScatterPlotData = BasePlotData & {
  sizes: number[]
  strokeWidths: number[]
  strokeColors: string[]
  fillColors: string[]
  shapes: 'circle'[]
}

type LinePlotData = BasePlotData & {
  color: string
  strokeWidth: number
}

type DataPoint = {
  x: number
  y: number
  extra: unknown | undefined
}

type PlotType = 'line' | 'scatter'

export type { ScatterPlotData, LinePlotData, BasePlotData, DataPoint, PlotType }
