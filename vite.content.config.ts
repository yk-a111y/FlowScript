import { defineConfig } from 'vite';
import { r, commonConfig } from './vite.config';
import { replaceCodePlugin } from 'vite-plugin-replace';
import hotReloadContent from './scripts/HMR/content';
import { __DEV__, outputDir } from './const';

export default defineConfig({
  ...commonConfig,
  build: {
    watch: __DEV__ ? {} : null,
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: false,
    outDir: r(`${outputDir}/contentScript`),
    rollupOptions: {
      input: {
        contentScript: r('src/content/index.ts'),
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: 'index.js',
        extend: true,
        format: 'iife',
      },
    },
  },
  plugins: [
    ...commonConfig.plugins,
    replaceCodePlugin({
      replacements: [
        {
          from: /:root\{/g,
          to: ':host{',
        },
      ],
    }),
    hotReloadContent(),
  ],
});
