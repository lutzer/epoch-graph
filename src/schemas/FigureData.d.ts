type BaseData = object

type FigureData = BaseData & {
  width: number
  height: number
  axes: PlotJson[]
}

type PlotData = BaseData & {
  texts: Text[]
  axes: AxisJson[]
}

type AxisData = BaseData & {
  position: Position
  scale: 'linear' | 'logarithmic'
  nticks: number
  tickformat_formatter: string
  grid: {
    gridOn: boolean
  }
  visible: boolean
}

type Text = {
  text: string
  coordinates: Coordinates
  rotation: number
}

type Line = {
  data: string
  xindex: number
  yindex: number
  color: string
}

type Position = 'top' | 'botton' | 'left' | 'right'
type Coordinates = 'axes' | 'data'

export type { BaseData, FigureData, AxisData, PlotData }
