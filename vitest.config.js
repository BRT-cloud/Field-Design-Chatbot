import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.js'],
    exclude: [
      'node_modules/**',
      'kordoc-main/**',
      'korean-secondary-learning-map-mcp-main/**',
      'dist/**'
    ],
    environment: 'node'
  }
});
