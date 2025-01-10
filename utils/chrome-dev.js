import { createServer } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');

async function buildExtension() {
  console.log('🔨 Building...');
  await fs.ensureDir(distDir);

  try {
    // exec vite build
    await exec('vite build', { cwd: root });
    console.log('✅ Build completed');
  } catch (error) {
    console.error('❌ Build failed:', error);
  }
}

async function startDevServer() {
  const server = await createServer({
    configFile: resolve(root, 'vite.config.ts'),
    root,
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
  });

  await server.listen();
  await fs.ensureDir(distDir);

  let buildTimeout;

  // watch files change
  server.watcher.on('change', async (file) => {
    console.log(`📝 File changed: ${file}`);

    // debounce, avoid frequent build
    clearTimeout(buildTimeout);
    buildTimeout = setTimeout(async () => {
      await buildExtension();
    }, 500);
  });

  // initial build
  await buildExtension();

  console.log('\n🚀 Extension development server running at:');
  console.log('➜ Local:', `http://localhost:5173`);
  console.log('📦 Load extension from:', distDir, '\n');
}

startDevServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});