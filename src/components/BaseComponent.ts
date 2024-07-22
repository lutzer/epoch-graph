import { BaseData } from '../schemas/FigureData'

abstract class BaseComponent<T extends BaseData> {
  protected _data: T | null = null
  abstract fromJson(data: T): BaseComponent<T>
}

export { BaseComponent }
