import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { __DEV__, outputDir } from './const';
// import eslintPlugin from 'vite-plugin-eslint';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import hotReloadBackground from './scripts/HMR/background';

export const r = (...args: string[]) => resolve(__dirname, '.', ...args);

export const commonConfig = {
  root: r('src'),
  define: {
    __DEV__,
  },
  resolve: {
    alias: {
      '@': `${r('src')}/`,
      '@public': `${r('public')}/`,
    },
  },
  plugins: [react()],
  // ignore .DS_Store
  server: {
    host: 'localhost',
    watch: {
      ignored: ['**/.DS_Store'],
    },
  },
};

export default defineConfig({
  ...commonConfig,
  build: {
    watch: __DEV__ ? {} : null,
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: false,
    outDir: r(outputDir),
    rollupOptions: {
      input: {
        background: r('src/background/index.ts'),
        popup: r('src/popup/index.html'),
        dashboard: r('src/dashboard/index.html'),
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name]/index.js',
        extend: true,
        format: 'es',
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [...commonConfig.plugins, hotReloadBackground()],
});
