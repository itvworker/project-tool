const config = require('./config')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin =require("mini-css-extract-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const merge = require('webpack-merge');
const webpack=require('webpack');
const path = require('path');

var baseWepback = require('./webpack.base.pro');



function resolve (dir) {
    return path.join(__dirname, '..', dir)
}




module.exports = merge(baseWepback,{
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks:{
            cacheGroups: {
                common:{
                    chunks: 'initial',
                    name:'repeat', // 打包后的文件名
                    minSize: 0, 
                    minChunks: 2 // 重复2次才能打包到此模块
                },
                vendor: {
                    priority: 1, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
                    test: /node_modules/, // 匹配对应文件
                    chunks: 'initial',
                    name:'vendor',
                    minSize: 0,
                    minChunks: 1
                }
            }
        }
    },
    
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.pro.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[id][hash:8].css'
        }),
        new CleanWebpackPlugin()

    ]
});
