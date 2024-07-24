import {
  AxisData,
  AxisPosition,
  FigureData,
  CanvasData,
  AxisScaleType
} from '../models/FigureData'
import {
  BasePlotData,
  DataPoint,
  LinePlotData,
  ScatterPlotData
} from '../models/PlotData'
import { Mpld3Data, Mpld3Position } from './Mpld3Data'

class Mpld3Parser {
  static parse(json: Mpld3Data): FigureData {
    const figure: FigureData = {
      width: json.width,
      height: json.height,
      canvases: json.axes.map((_, i) => parseCanvas(json, i))
    }
    return figure
  }
}

function parseCanvas(json: Mpld3Data, canvasIndex: number): CanvasData {
  return {
    title: 'Title',
    margins: [20, 20, 20, 80],
    axes: json.axes[canvasIndex].axes.map((_, i) =>
      parseAxis(json, canvasIndex, i)
    ),
    background: json.axes[canvasIndex].axesbg || 'transparent',
    plots: parsePlots(json, canvasIndex),
    xScale: {
      domain: json.axes[canvasIndex].xdomain,
      lim: json.axes[canvasIndex].xlim,
      scaleType:
        json.axes[canvasIndex].xscale == 'linear'
          ? AxisScaleType.LINEAR
          : AxisScaleType.LOGARITHMIC
    },
    yScale: {
      domain: json.axes[canvasIndex].ydomain,
      lim: json.axes[canvasIndex].ylim,
      scaleType:
        json.axes[canvasIndex].yscale == 'linear'
          ? AxisScaleType.LINEAR
          : AxisScaleType.LOGARITHMIC
    }
  }
}

function parseAxis(
  json: Mpld3Data,
  canvasIndex: number,
  axisIndex: number
): AxisData {
  const axisData = json.axes[canvasIndex].axes[axisIndex]
  return {
    position: parsePosition(axisData.position),
    grid: {
      visible: axisData.grid.gridOn,
      color: axisData.grid.color || 'black'
    },
    ticks: {
      numberOfTicks: axisData.nticks,
      values: axisData.tickvalues || []
    }
  }
}

function parsePlots(json: Mpld3Data, canvasIndex: number): BasePlotData[] {
  const plots: BasePlotData[] = []

  const linePlots = json.axes[canvasIndex].lines.map((_, i) =>
    parseLines(json, canvasIndex, i)
  )
  plots.push(...linePlots)

  const scatterPlots = json.axes[canvasIndex].collections.map((_, i) =>
    parseCollections(json, canvasIndex, i)
  )
  plots.push(...scatterPlots)

  return plots
}

function parseLines(
  json: Mpld3Data,
  canvasIndex: number,
  lineIndex: number
): LinePlotData {
  const lineData = json.axes[canvasIndex].lines[lineIndex]

  return {
    color: lineData.color,
    strokeWidth: lineData.linewidth,
    points: parseData(json, lineData.data, lineData.xindex, lineData.yindex),
    type: 'line'
  }
}

function parseCollections(
  json: Mpld3Data,
  canvasIndex: number,
  collectionIndex: number
): ScatterPlotData {
  const collectionData = json.axes[canvasIndex].collections[collectionIndex]

  return {
    points: parseData(
      json,
      collectionData.offsets,
      collectionData.xindex,
      collectionData.yindex
    ),
    type: 'scatter',
    sizes: collectionData.pathtransforms.map((t) => t[0]),
    strokeColors: collectionData.edgecolors,
    strokeWidths: collectionData.edgewidths,
    fillColors: collectionData.facecolors,
    shapes: ['circle']
  }
}

function parseData(
  json: Mpld3Data,
  dataId: string,
  xIndex: number,
  yIndex: number
): DataPoint[] {
  return json.data[dataId].map((v) => {
    return { x: v[xIndex], y: v[yIndex], extra: undefined }
  })
}

function parsePosition(json: Mpld3Position): AxisPosition {
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

export { Mpld3Parser }
