// 设置环境变量
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

import { createServer, build } from 'vite';
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const __DEV__ = process.env.CRX_ENV === 'development';
const outputDir = 'dist';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const r = (...args) => resolve(__dirname, '..', ...args);
const PORT = 3000;

async function copyFiles() {
  // 确保输出目录存在
  await fs.ensureDir(r('dist'));

  // 复制 manifest 文件
  await fs.copy(
    r('src/manifest.chrome.json'),
    r('dist/manifest.json')
  );

  // 复制静态资源
  if (await fs.exists(r('public'))) {
    await fs.copy(r('public'), r('dist'));
  }

  console.log('Manifest and assets copied successfully');
}

// 监听文件变化
function watchFiles() {
  fs.watch(r('src/manifest.chrome.json'), async (eventType) => {
    if (eventType === 'change') {
      await fs.copy(
        r('src/manifest.chrome.json'),
        r('dist/manifest.json')
      );
      console.log('Manifest updated');
    }
  });

  fs.watch(r('public'), { recursive: true }, async (eventType, filename) => {
    if (eventType === 'change') {
      await fs.copy(
        r('public'),
        r('dist')
      );
      console.log(`Asset updated: ${filename}`);
    }
  });
}

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

// Vite 配置
const config = {
  ...commonConfig,
  build: {
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
};

// 开发服务器
async function startDevServer() {
  try {
    // 首先复制文件
    await copyFiles();

    // 启动文件监听
    watchFiles();

    // 启动构建监听
    await build({
      ...config,
      mode: 'development',
      build: {
        ...config.build,
        watch: {
          onRebuild(error, result) {
            if (error) {
              console.error('Build failed:', error);
            } else {
              console.log('Build succeeded');
            }
          }
        }
      }
    });

    console.log(`
      🚀 Dev server running at: http://localhost:${PORT}
      📦 Output directory: ${config.build.outDir}
      🔥 HMR enabled
    `);

  } catch (e) {
    console.error('Failed to start dev server:', e);
    process.exit(1);
  }
}

if (process.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept();
}

(async () => {
  await startDevServer();
})();
