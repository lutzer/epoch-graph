import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'], // CommonJS, ES Modules, and IIFE for browser
  globalName: 'EpochGraph', // Global variable name for IIFE format
  dts: true, // Generate .d.ts files
  sourcemap: true,
  clean: true
});