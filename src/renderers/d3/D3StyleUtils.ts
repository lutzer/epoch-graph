import { FigureStyle, FontStyle } from '../../models/StyleData'

class D3StyleUtils {
  static createCssFromStyle(style: FigureStyle): string {
    const cssClasses = {
      '.title': parseFontStyle(style.title.font),
      '.tick > text': parseFontStyle(style.canvas.axis.ticks.font, [
        'text-anchor'
      ])
    }

    return Object.entries(cssClasses).reduce((acc, curr) => {
      const [property, value] = curr
      return acc + `${property} {\n${value}}\n`
    }, '')
  }
}

function parseFontStyle(style: FontStyle, omitProperty: string[] = []): string {
  const cssProperties = {
    'font-family': style.fontFamily,
    'font-size': `${style.fontSize}`,
    color: style.color,
    'font-weight': style.fontWeight,
    'text-anchor': style.textAnchor
  }

  return Object.entries(cssProperties)
    .filter((p) => !omitProperty.includes(p[0]))
    .reduce((acc, curr) => {
      const [property, value] = curr
      return acc + `\t${property}: ${value};\n`
    }, '')
}

export { D3StyleUtils }
