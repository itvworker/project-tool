import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [
    vue(), 
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue'`
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx", ".vue"],
  },
  server: {
    fs: {
      strict: false
    }
  },
  
})
