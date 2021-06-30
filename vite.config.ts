import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import itv from './vite/itv-plugin'
import path from 'path';
export default defineConfig({
  plugins: [vue(), itv()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue'`
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  }
})
