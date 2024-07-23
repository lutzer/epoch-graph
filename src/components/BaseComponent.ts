import { BaseData } from '../models/FigureData'

abstract class BaseComponent<T extends BaseData> {
  constructor(public data: T) {}
}
export { BaseComponent }
