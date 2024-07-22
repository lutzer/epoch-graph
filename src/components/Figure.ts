import { BaseRenderer } from '../renderers/BaseRenderer';
import { D3Renderer } from '../renderers/D3Renderer';
import { FigureJson } from '../schemas/FigureJson';
import { Axis } from './Axis';
import { BaseComponent } from './BaseComponent';
import { Plot } from './Plot';

class Figure implements BaseComponent {
  container: HTMLElement;
  renderer: BaseRenderer;

  plots: Plot[]
  axis: Axis[]
  
  title: string = ""

  constructor(container: HTMLElement, renderer: BaseRenderer = new D3Renderer()) {
    this.renderer = renderer;
    this.container = container;
    this.plots = []
    this.axis = []
  }

  public loadJson(json: FigureJson) {
    console.log(json);
  }

  setup() {
    
  }

  draw(): void {
    this.renderer.getFigureRenderer().render(this);
    this.plots.forEach(p => p.draw(this.renderer))
    this.axis.forEach(p => p.draw(this.renderer))
  }
}

export { Figure };
