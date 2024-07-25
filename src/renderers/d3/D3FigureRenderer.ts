import * as d3 from 'd3'
import { Figure } from '../../components/Figure'
import { D3ComponentRenderer } from './D3BaseComponentRenderer'
import { D3CanvasRenderer } from './D3CanvasRenderer'
import { D3Utils } from './D3Utils'

class D3FigureRenderer extends D3ComponentRenderer<Figure> {
  canvasRenderers: D3CanvasRenderer[] = []

  title: SVGTextElement | null = null
  style: HTMLStyleElement | null = null
  logo: SVGImageElement | null = null

  create(parent: SVGGElement): D3FigureRenderer {
    this.svg = d3.select(parent).attr('class', 'figure').node()
    this.style = d3.select(this.svg).append('style').node()
    this.title = d3
      .select(this.svg)
      .append('text')
      .attr('class', 'title')
      .style('dominant-baseline', 'hanging')
      .node()
    this.logo = d3.select(this.svg).append('image').attr('class', 'logo').node()

    this.canvasRenderers = this.component.canvases.map((plot) =>
      new D3CanvasRenderer(plot).create(this.svg!)
    )
    return this
  }

  update() {
    d3.select(this.svg)
      .attr('width', this.component.size[0])
      .attr('height', this.component.size[1])
      .attr('viewBox', [0, 0, this.component.size[0], this.component.size[1]])

    d3.select(this.style).text(D3Utils.createCssFromStyle(this.component.style))

    D3Utils.createWrappedText(
      this.title!,
      this.component.data!.title,
      this.component.size[0] * 0.5,
      `${this.component.style.title.font.fontSize} ${this.component.style.title.font.fontFamily}`,
      1.0
    )

    d3.select(this.title).style(
      'transform',
      `translate(${this.component.style.title.translate[0]},${this.component.style.title.translate[1]})`
    )

    d3.select(this.logo)
      .attr('xlink:href', this.component.style.logo.src)
      .attr(
        'x',
        this.component.style.logo.anchor[0] * this.component.size[0] +
          this.component.style.logo.offset[0]
      )
      .attr(
        'y',
        this.component.style.logo.anchor[1] * this.component.size[1] +
          this.component.style.logo.offset[1]
      )
      .attr('width', this.component.style.logo.size[0]) // Width of the image
      .attr('height', this.component.style.logo.size[1]) // Height of the image

    this.canvasRenderers.forEach((c) => c.update())
  }

  resize(width: number, height: number) {
    if (this.component.size[0] !== width || this.component.size[1] !== height) {
      this.component.size = [width, height]
    }
  }
}

export { D3FigureRenderer }
