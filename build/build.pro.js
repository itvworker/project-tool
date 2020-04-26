process.env.NODE_ENV = 'production';
global.mxpart = process.argv.splice(2);
require('./pro.auto.js')();
const webpack = require('webpack');
const webpackConfig = require('./webpack.pro');
const ora = require('ora');


console.log(
    '  Tip:\n'
    + '  Built files are meant to be served over an HTTP server.\n'
    + '  Opening index.html over file:// won\'t work.\n',
);
//
const spinner = ora('building for production...');
spinner.start();

// console.log(webpackConfig.module.rules[1])



console.log(JSON.stringify(webpackConfig, null, 4));

webpack(webpackConfig,(err, stats)=>{
    // console.log(err);
    spinner.stop();
    console.log(stats);
});

