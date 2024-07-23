type Mpld3Data = {
  width: number
  height: number
  axes: {
    axes: {
      position: Mpld3Position
      scale: Mpld3Scale
      nticks: number
      tickformat_formatter: string
      visible: boolean
      grid: {
        gridOn: boolean
        color: string
      }
    }[]
    xdomain: [number, number]
    ydomain: [number, number]
    xlim: [number, number]
    ylim: [number, number]
    xscale: Mpld3Scale
    yscale: Mpld3Scale
    lines: {
      data: string
      xindex: number
      yindex: number
      color: string
      linewidth: number
    }[]
    collections: {
      edgecolors: string[]
      facecolors: string[]
      paths: [[number, number][], unknown][]
      xindex: number
      yindex: number
      offsets: string
    }[]
  }[]
  data: {
    [key: string]: number[][]
  }
}

type Mpld3Position = 'top' | 'bottom' | 'left' | 'right'
type Mpld3Scale = 'linear' | 'logarithmic'

export type { Mpld3Data, Mpld3Position, Mpld3Scale }
