import { RenderComponent } from '../../components/RenderComponent'

abstract class D3ComponentRenderer<T extends RenderComponent> {
  svg: SVGGElement | null = null

  constructor(public component: T) {}

  abstract create(parent: SVGGElement): D3ComponentRenderer<T>
  abstract update(): void
}

export { D3ComponentRenderer }
