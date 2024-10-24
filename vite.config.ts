import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // root: process.env.VITE_ROOT || 'src/dashboard',
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
        dashboard: resolve(__dirname, 'src/dashboard/index.html'),
        sandbox: resolve(__dirname, 'src/sandbox/index.html'),
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [react()],
});
