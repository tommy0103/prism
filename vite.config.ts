import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-css',
    enforce: 'post',
    generateBundle(_, bundle) {
      let cssCode = ''
      const cssFiles: string[] = []

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith('.css')) {
          cssCode += (chunk as any).source
          cssFiles.push(fileName)
        }
      }

      for (const f of cssFiles) {
        delete bundle[f]
      }

      if (cssCode) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk' && chunk.isEntry) {
            const escaped = JSON.stringify(cssCode)
            const injection = `(function(){var s=document.createElement("style");s.textContent=${escaped};document.head.appendChild(s)})();\n`
            chunk.code = injection + chunk.code
            break
          }
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    inlineCssPlugin(),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PrismUI',
      formats: ['iife'],
      fileName: () => 'prism.iife.js',
    },
    cssCodeSplit: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  test: {
    environment: 'happy-dom',
  },
})
