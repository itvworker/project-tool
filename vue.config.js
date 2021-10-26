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
    }
}

