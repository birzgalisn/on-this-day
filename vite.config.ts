/// <reference types="vitest/config" />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babelConfig from './babel.config.js';

// https://vite.dev/config
export default defineConfig({
  plugins: [react({ babel: babelConfig })],
  resolve: {
    alias: { '~': path.resolve(import.meta.dirname, 'src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    setupFiles: 'src/__tests__/setup.ts',
    coverage: { provider: 'v8' },
  },
});
