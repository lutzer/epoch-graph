import {
  AxisData,
  AxisPosition,
  AxisScale,
  FigureData,
  CanvasData
} from '../models/FigureData'

class Mpld3Parser {
  static parse(json: Mpld3Data): FigureData {
    const figure: FigureData = {
      width: json.width,
      height: json.height,
      canvases: json.axes.map((_, i) => this.parsePlot(json, i))
    }
    return figure
  }

  static parsePlot(json: Mpld3Data, canvasIndex: number): CanvasData {
    return {
      title: 'Title',
      margins: [20, 20, 20, 40],
      axes: json.axes[canvasIndex].axes.map((_, i) =>
        this.parseAxis(json, canvasIndex, i)
      ),
      background: '#00000011'
    }
  }

  static parseAxis(
    json: Mpld3Data,
    canvasIndex: number,
    axisIndex: number
  ): AxisData {
    const axisData = json.axes[canvasIndex].axes[axisIndex]
    const position = this.parsePosition(axisData.position)
    const domain =
      position == AxisPosition.TOP || position == AxisPosition.BOTTOM
        ? json.axes[canvasIndex].xdomain
        : json.axes[canvasIndex].ydomain
    const lim =
      position == AxisPosition.TOP || position == AxisPosition.BOTTOM
        ? json.axes[canvasIndex].xlim
        : json.axes[canvasIndex].ylim
    return {
      position: this.parsePosition(axisData.position),
      domain: domain,
      lim: lim,
      scale:
        axisData.scale == 'linear' ? AxisScale.LINEAR : AxisScale.LOGARITHMIC,
      grid: {
        visible: axisData.grid.gridOn,
        color: axisData.grid.color
      },
      ticks: {
        numberOfTicks: axisData.nticks
      }
    }
  }

  static parsePosition(json: Position): AxisPosition {
    switch (json) {
      case 'bottom':
        return AxisPosition.BOTTOM
      case 'top':
        return AxisPosition.TOP
      case 'left':
        return AxisPosition.LEFT
      case 'right':
        return AxisPosition.RIGHT
    }
  }
}

type Mpld3Data = {
  width: number
  height: number
  axes: {
    axes: {
      position: Position
      scale: Scale
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
    lines: {
      data: string
      xindex: number
      yindex: number
      color: string
    }[]
  }[]
}

type Position = 'top' | 'bottom' | 'left' | 'right'
type Scale = 'linear' | 'logarithmic'

export { Mpld3Parser }
export type { Mpld3Data }
