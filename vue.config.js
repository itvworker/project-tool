const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
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
            Components({
                resolvers: [ElementPlusResolver()],
            })
        ]
      }
}

