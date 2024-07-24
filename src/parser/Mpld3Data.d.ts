type Mpld3Data = {
  width: number
  height: number
  axes: {
    axes: Axes[]
    xdomain: [number, number]
    ydomain: [number, number]
    xlim: [number, number]
    ylim: [number, number]
    xscale: Mpld3Scale
    yscale: Mpld3Scale
    lines: Lines[]
    collections: Collections[]
    axesbg: string
  }[]
  data: {
    [key: string]: number[][]
  }
}

type Axes = {
  position: Mpld3Position
  scale: Mpld3Scale
  nticks: number
  tickvalues: number[]
  tickformat_formatter: string
  visible: boolean
  grid: {
    gridOn: boolean
    color: string
  }
}

type Lines = {
  data: string
  xindex: number
  yindex: number
  color: string
  linewidth: number
}

type Collections = {
  edgecolors: string[]
  edgewidths: number[]
  facecolors: string[]
  paths: [[number, number][], unknown][]
  xindex: number
  yindex: number
  offsets: string
  pathtransforms: [number, number, number, number, number, number][]
}

type Mpld3Position = 'top' | 'bottom' | 'left' | 'right'
type Mpld3Scale = 'linear' | 'log'

export type { Mpld3Data, Mpld3Position, Mpld3Scale }
