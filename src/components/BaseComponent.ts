import { BaseRenderer } from "../renderers/BaseRenderer";

interface BaseComponent {
  draw(renderer: BaseRenderer): void;
}

export type { BaseComponent };
