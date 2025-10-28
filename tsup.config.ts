import { defineConfig } from 'tsup'

export default defineConfig({
  // Entry point
  entry: ['src/index.ts'],

  // Output formats: ESM and CJS
  format: ['esm', 'cjs'],

  // Output directory
  outDir: 'dist',

  // Generate TypeScript declarations
  dts: true,

  // Generate sourcemaps
  sourcemap: true,

  // Clean dist before build
  clean: true,

  // Target ES2022 (matches tsconfig)
  target: 'es2022',

  // External dependencies (not bundled)
  external: ['react', 'react-dom', 'kamasi'],

  // Split output into chunks for better tree-shaking
  splitting: false,

  // Keep JSX for better debugging
  jsx: 'automatic',

  // Minification (disabled for library)
  minify: false,

  // Tree-shake for smaller bundles
  treeshake: true,

  // Copy CSS file to dist
  async onSuccess() {
    const fs = await import('node:fs/promises')
    await fs.copyFile('src/styles.css', 'dist/styles.css')
  },
})
