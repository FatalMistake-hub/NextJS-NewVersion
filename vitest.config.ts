import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import visualizer from 'rollup-plugin-visualizer'
import path from 'path'

export default defineConfig({
  plugins: [react(), visualizer()] as any,
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@app': '/src/app',
      '@redux': '/src/redux',
    },
  },
  server: {
    port: 3000,
  },
})
