import {
  AxisData,
  AxisPosition,
  AxisScale,
  FigureData,
  PlotData
} from '../models/FigureData'

class Mpld3Parser {
  static parse(json: Mpld3Data): FigureData {
    const figure: FigureData = {
      width: json.width,
      height: json.height,
      plots: json.axes.map((_, i) => this.parsePlot(json, i))
    }
    return figure
  }

  static parsePlot(json: Mpld3Data, plotIndex: number): PlotData {
    return {
      title: 'Title',
      margins: [40, 40, 40, 80],
      axes: json.axes[plotIndex].axes.map((_, i) =>
        this.parseAxis(json, plotIndex, i)
      ),
      background: '#00000011'
    }
  }

  static parseAxis(
    json: Mpld3Data,
    plotIndex: number,
    axisIndex: number
  ): AxisData {
    const axisData = json.axes[plotIndex].axes[axisIndex]
    const position = this.parsePosition(axisData.position)
    const domain =
      position == AxisPosition.TOP || position == AxisPosition.BOTTOM
        ? json.axes[plotIndex].xdomain
        : json.axes[plotIndex].ydomain
    const lim =
      position == AxisPosition.TOP || position == AxisPosition.BOTTOM
        ? json.axes[plotIndex].xlim
        : json.axes[plotIndex].ylim
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
