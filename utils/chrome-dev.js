import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { createServer } from 'vite';
import chokidar from 'chokidar';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// set env variable
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

async function reloadExtension() {
  const RELOAD_CODE = `
    chrome.runtime.reload();
  `;

  exec(`osascript -e 'tell application "Google Chrome" to execute javascript "${RELOAD_CODE}" in active tab of front window'`);
}

async function startDevServer() {
  const server = await createServer({
    configFile: resolve(__dirname, '../vite.config.ts'),
    root: process.cwd(),
    server: {
      port: 3003,
      strictPort: true,
      hmr: {
        port: 3003,
        overlay: false,
      },
    },
  });

  await server.listen();

  const distDir = resolve(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 使用相对路径监听文件
  const watcher = chokidar.watch([
    'src/**/*',  // 监听所有源文件
    'public/**/*',  // 监听 public 文件夹
    'manifest.chrome.json'  // 监听 manifest 文件
  ], {
    cwd: resolve(__dirname, '..'),
    ignored: ['**/node_modules/**', '**/dist/**'],
    persistent: true,
  });

  let debounceTimer;

  watcher.on('all', async (event, filepath) => {
    console.log(`File ${filepath} has been ${event}`);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        // 执行构建
        await server.close();
        await server.listen();

        // 复制必要文件
        if (filepath.includes('background')) {
          const backgroundSrc = resolve(__dirname, '../src/background/index.ts');
          const backgroundDist = resolve(distDir, 'background.js');
          fs.copyFileSync(backgroundSrc, backgroundDist);
        }

        if (filepath.includes('manifest.chrome.json')) {
          const manifestPath = resolve(__dirname, '../manifest.chrome.json');
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          fs.writeFileSync(
            resolve(distDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
          );
        }

        // 重新加载扩展
        await reloadExtension();
        console.log('🔄 Extension reloaded successfully!');
      } catch (error) {
        console.error('❌ Build failed:', error);
      }
    }, 100);
  });

  console.log('\x1b[32m%s\x1b[0m', `
    🚀 Development server running at: http://localhost:3003
    👉 Load unpacked extension from: ${distDir}
    📦 Hot reload enabled - watching for changes...
  `);
}

startDevServer().catch((err) => {
  console.error('❌ Server start failed:', err);
  process.exit(1);
});
