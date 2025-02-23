import fs from 'fs-extra'
import chokidar from 'chokidar'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const r = (rootPath) => resolve(__dirname, '..', rootPath)
const __DEV__ = process.env.CRX_ENV === 'development'
const outputDir = __DEV__ ? 'local' : 'extension'

const origin = {
  manifest: r('src/manifest.chrome.json'),
  assets: r('public/assets')
}

const target = {
  manifest: r(`${outputDir}/manifest.json`),
  assets: r(`${outputDir}/assets`)
}

const copyManifest = () => {
  fs.copy(origin.manifest, target.manifest)
}

const copyIndexHtml = async () => {
  for (const view of ['popup']) {
    await fs.ensureDir(r(`${outputDir}/${view}`))
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8')
    data = data.replace(/\.ts/g, '.js')
    await fs.writeFile(r(`${outputDir}/${view}/index.html`), data, 'utf-8')
  }
  console.log('复制html文件成功')
}
const copyAssets = () => {
  fs.copy(origin.assets, target.assets)
}

copyManifest()
copyIndexHtml()
copyAssets()

if (__DEV__) {
  chokidar.watch([origin.manifest]).on('change', () => {
    copyManifest()
  })
  chokidar.watch(r('src/**/*.html')).on('change', () => {
    copyIndexHtml()
  })
}
