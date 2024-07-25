import * as d3 from 'd3'
import { FigureStyle, FontStyle, StrokeStyle } from '../../models/StyleData'

class D3Utils {
  static createWrappedText(
    textElement: SVGTextElement,
    text: string,
    maxWidth: number,
    font: string,
    lineHeight: number = 1.2
  ) {
    function getTextWidth(
      text: string,
      font: string,
      canvas: HTMLCanvasElement
    ): number {
      const context = canvas.getContext('2d')!
      context.font = font
      const metrics = context.measureText(text)
      return metrics.width
    }

    const canvas: HTMLCanvasElement =
      document.querySelector('canvas') || document.createElement('canvas')

    const lines = text.split(' ').reduce(
      (acc, word) => {
        acc[acc.length - 1] += word + ' '
        const width = getTextWidth(acc[acc.length - 1], font, canvas)
        if (width > maxWidth) {
          acc.push('')
        }
        return acc
      },
      ['']
    )

    const d3Text = d3.select(textElement)

    const tspans = d3Text
      .selectAll<SVGTSpanElement, unknown>('tspan')
      .data(lines)

    tspans
      .enter()
      .append('tspan')
      .merge(tspans)
      .attr('x', 0)
      .attr('dy', (d, i) => `${i === 0 ? 0 : lineHeight}em`)
      .text((d) => d.trim())
      .exit()
      .remove()
  }

  static createCssFromStyle(style: FigureStyle): string {
    const cssClasses = {
      '.title': parseFontStyle(style.title.font),
      '.tick > text': parseFontStyle(style.canvas.axis.ticks.font, [
        'text-anchor'
      ]),
      '.axis > path.domain': parseStrokeStyle(style.canvas.axis.line),
      '.grid > path': parseStrokeStyle(style.canvas.axis.grid),
      '.axis-label.x-axis': parseFontStyle(style.canvas.axis.xLabel.font),
      '.axis-label.y-axis': parseFontStyle(style.canvas.axis.yLabel.font)
    }

    return Object.entries(cssClasses).reduce((acc, curr) => {
      const [property, value] = curr
      return acc + `${property} {\n${value}}\n`
    }, '')
  }
}

function parseStrokeStyle(style: StrokeStyle, omitProperty: string[] = []) {
  const cssProperties = {
    stroke: style.color,
    'stroke-width': style.width
  }
  return createPropertyString(cssProperties, omitProperty)
}

function parseFontStyle(style: FontStyle, omitProperty: string[] = []): string {
  const cssProperties = {
    'font-family': style.fontFamily,
    'font-size': `${style.fontSize}`,
    color: `${style.color}`,
    'font-weight': style.fontWeight,
    'text-anchor': style.textAnchor,
    fill: style.color
  }
  return createPropertyString(cssProperties, omitProperty)
}

function createPropertyString(
  cssProperties: object,
  omitProperty: string[] = []
): string {
  return Object.entries(cssProperties)
    .filter((p) => !omitProperty.includes(p[0]))
    .reduce((acc, curr) => {
      const [property, value] = curr
      return acc + `\t${property}: ${value};\n`
    }, '')
}

export { D3Utils }
