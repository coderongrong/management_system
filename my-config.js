import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const config = {
  // ...
  plugins: [
    vue(),
  ],
  server: {
    port: 8000
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'indexTwo.html'),
        // 你可以添加更多的入口
      },
    },
  },
}

export default defineConfig(config)