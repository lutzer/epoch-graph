import { Figure } from '../components/Figure'

interface BaseRenderer {
  setup(figure: Figure): void
  update(): void
}

export type { BaseRenderer }
