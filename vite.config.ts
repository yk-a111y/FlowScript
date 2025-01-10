import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path, { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';
import type { PreRenderedAsset } from 'rollup';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, './public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        dashboard: resolve(__dirname, 'src/dashboard/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        // JS 文件平铺到根目录
        entryFileNames: '[name].js',
        // 代码分割的 chunk 也平铺到根目录
        chunkFileNames: '[name]-[hash].js',
        // 只有静态资源保持在 assets 目录结构
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          // 如果是图片或字体等静态资源，放入 assets 目录
          if (
            /\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|eot|ttf|otf)$/i.test(
              assetInfo.name || ''
            )
          ) {
            if (
              /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(assetInfo?.name || '')
            ) {
              return `assets/images/[name][extname]`;
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo?.name || '')) {
              return `assets/fonts/[name][extname]`;
            }
            return `assets/[ext]/[name][extname]`;
          }
          // CSS 和其他文件都平铺到根目录
          return '[name][extname]';
        },
      },
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    copyPublicDir: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.chrome.json',
          dest: '',
          rename: 'manifest.json',
        },
      ],
    }),
  ],
  // 添加 .DS_Store 到忽略列表
  server: {
    watch: {
      ignored: ['**/.DS_Store'],
    },
  },
});
