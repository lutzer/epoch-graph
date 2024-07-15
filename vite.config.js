import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'EpochGraph',
      fileName: (format) => `epoch-graph.${format}.js`
    },
  }
});
