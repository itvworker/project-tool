module.exports = {
    proxy: { //代理
        '/pxcloud': {
            target: 'http://weiq.0799vip.com:18080/',
            changeOrigin: true,
            pathRewrite: {
                '^pxcloud': 'http://weiq.0799vip.com:18080'
            }
        },
        '/mas-api/restful': {
            target: 'https://mapnew.midea.com',
            changeOrigin: true,
            pathRewrite: {
                '^mas-api/restful': 'https://mapnew.midea.com'
            }
        }
    }
}
