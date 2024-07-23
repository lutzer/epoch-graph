import { BaseData } from './FigureData'

type BasePlot = BaseData & {
  points: DataPoint[]
  type: PlotType
}

type ScatterPlotData = BasePlot & {
  sizes: number[]
  strokeColors: number[]
  fillColors: number[]
  path: [number, number][]
}

type LinePlotData = BasePlot & {
  color: string
  strokeWidth: number
}

type DataPoint = {
  x: number
  y: number
  extra: unknown | undefined
}

type PlotType = 'line' | 'scatter'

export type { ScatterPlotData, LinePlotData, BasePlot, DataPoint, PlotType }
