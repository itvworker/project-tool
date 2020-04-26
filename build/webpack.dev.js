process.env.NODE_ENV = "development";
const config = require('./config')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWepback = require('./webpack.base');

const path = require('path')


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// baseWepback.module.rules.forEach((item,index)=>{
//
// })
baseWepback.output.publicPath="/";


module.exports = Object.assign(baseWepback,{
    mode: 'development',
    devtool: '#eval-source-map',
    
    // productionSourceMap: true,
    devServer: {        // 设置基本结构
        contentBase: resolve('dist'),
        host: '0.0.0.0', // 服务器IP地址,可以是localhost
        compress: true, // 服务端压缩是否开启
        open: false, // 自动打开浏览器
        hot: true, // 开启热更新
        port: 8888,
        proxy: { //代理
            '/mas/v5/': {
                target: 'https://mapnew5sit.midea.com',
                changeOrigin: true,
                pathRewrite: {
                    '^mas/v5/': 'https://mapnew5sit.midea.com'
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
    },
    stats: {
        children: false,
        warnings: true,
        source: true,
        hash: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.dev.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../dev'),
                to: './dev',
                ignore: ['.*'],
            },
        ]),
    ]
});
