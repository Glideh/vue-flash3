import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import path from 'path'

export default defineConfig({
  server: {
    port: 80,
    host: '0.0.0.0',
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component'
    })
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
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
