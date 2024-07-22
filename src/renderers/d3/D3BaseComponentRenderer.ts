import { BaseComponent } from '../../components/BaseComponent'
import { BaseData } from '../../schemas/FigureData'

abstract class D3ComponentRenderer<T extends BaseComponent<BaseData>> {
  svg: SVGSVGElement | null = null

  constructor(public component: T) {}

  abstract create(parent: SVGSVGElement): D3ComponentRenderer<T>
  abstract update(): void
}

export { D3ComponentRenderer }
