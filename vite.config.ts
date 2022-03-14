import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default {
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    globals: {
        __DEV__: true,
        __TEST__: true,
        __BROWSER__: false,
        __GLOBAL__: false,
        __ESM_BUNDLER__: true,
        __ESM_BROWSER__: false,
        __NODE_JS__: true,
        __FEATURE_OPTIONS_API__: true,
        __FEATURE_SUSPENSE__: true,
        __FEATURE_PROD_DEVTOOLS__: false
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "~/element/index.scss" as *;'
            }
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: 'import { h, Fragment } from "vue"'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue']
    },
    server: {
        fs: {
            strict: false
        },
        host: '0.0.0.0'
    }
}
