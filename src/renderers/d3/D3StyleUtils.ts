import { FigureStyle, FontStyle, StrokeStyle } from '../../models/StyleData'

class D3StyleUtils {
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
    color: style.color,
    'font-weight': style.fontWeight,
    'text-anchor': style.textAnchor
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

export { D3StyleUtils }
