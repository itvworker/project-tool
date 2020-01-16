const path = require('path');
const config = require('./config')
const loader = require('./loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode:'development',
    context: resolve(''),
    entry: {
        app: ['babel-polyfill', './src/entry/main.js'],
    },
    output: {
        path: resolve('dist'),
        filename: '[name].[hash:4].js', // [name]打包后的文件名称,进入是什么名字出来也是
        chunkFilename: '[name].[hash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                // use:[{
                //      loader: 'vue-loader',
                //      options: loader
                //     }
                // ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    "css-loader",
                ]

            },
            {
              test: /\.less$/,
              use: [
                'vue-style-loader',
                'css-loader',
                'less-loader',
                {
                    loader: "sass-resources-loader",
                    options: {
                        resources: [resolve('src/assets/css/const.less')]
                    }
                },
                {
                    loader: "units-loader",
                    options: {
                        unit: "rem",
                        divisor: 37.5,
                        accuracy: 6,
                        raw: "rpx"
                    }
                }
              ]
            },
            {
                test: /\.js$/,
                use:[
                    {
                    loader:'babel-loader',
                    }
                ],
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
            }
        ]
    },
    devServer: {
      //设置基本结构
      contentBase: resolve('dist'),
      host: '0.0.0.0',//服务器IP地址,可以是localhost
      compress: true,//服务端压缩是否开启
      open: false,// 自动打开浏览器
      hot: true ,// 开启热更新
      port: 8888
   },
    stats: {
        children: false,
        warnings: true,
        source: true,
        hash: true,
     },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.dev.html',
            inject: true,
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../public'),
        //         to: '.',
        //         ignore: ['.*'],
        //     },
        // ]),
    ],
}
