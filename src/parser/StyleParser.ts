import { defaultFigureStyle, FigureStyle } from '../models/StyleData'

class StyleParser {
  static parse(json: object): FigureStyle {
    return { ...defaultFigureStyle, ...json }
  }
}

export { StyleParser }
