import { Figure } from '../components/Figure'

class BaseRenderer {
  constructor(private container: HTMLElement) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(figure: Figure) {}

  update() {
    throw new Error(
      'Method not implemented. No renderer defined to render figure: ' + figure
    )
  }
}

export { BaseRenderer }
