const Components = require('unplugin-vue-components/webpack');
const AutoImport = require('unplugin-auto-import/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const path = require('path');

module.exports = {
    pages: {
        index: {
            entry:"src/main.ts",
            template: 'public/index.dev.html',
            file:"index.html",
            title:"项目脚手架",
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
   
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json', '.tsx', '.ts'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                "@vue/*": path.resolve(__dirname, "src/vue3.0/packages/*/src"),
                "vue": path.resolve(__dirname, "src/vue3.0/packages/vue/src")
            }
        }
    }
}
