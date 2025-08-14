import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import copy from 'rollup-plugin-copy'
import fs from 'fs'

export default defineConfig({
  server: {
    port: 80,
    host: '0.0.0.0',
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component'
    }),
    {
      name: 'create-root-scss',
      closeBundle() {
        const outPath = path.resolve(__dirname, 'dist/scss.scss')
        const content = `@forward "./scss/index.scss";\n`
        fs.writeFileSync(outPath, content, 'utf-8')
      }
    }
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/flash/index.ts"),
      name: "vue-flash3",
      fileName: "vue-flash3",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
      plugins: [
        copy({
          targets: [
            { src: path.resolve(__dirname, 'src/flash/style/*'), dest: 'dist/scss' },
          ],
          hook: 'writeBundle'
        })
      ]
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
