import { BaseData } from '../models/FigureData'

abstract class BaseComponent<T extends BaseData> {
  constructor(public data: T) {}
}

interface RenderComponent {
  get position(): [number, number]
  get size(): [number, number]
}

export { BaseComponent }
export type { RenderComponent }
