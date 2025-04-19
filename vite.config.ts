/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://github.com/facebook/react/blob/main/compiler/packages/babel-plugin-react-compiler/src/Entrypoint/Options.ts#L41
const ReactCompilerConfig = {};

// https://vite.dev/config
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    setupFiles: 'src/__tests__/setup.ts',
    coverage: { provider: 'v8' },
  },
});
