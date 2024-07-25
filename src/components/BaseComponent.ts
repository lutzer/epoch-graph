import { BaseData } from '../models/FigureData'
import { FigureStyle } from '../models/StyleData'
import { Figure } from './Figure'

abstract class BaseComponent<T extends BaseData> {
  constructor(
    public data: T,
    public figure: Figure
  ) {}

  get style(): FigureStyle {
    return this.figure.style
  }
}
export { BaseComponent }
