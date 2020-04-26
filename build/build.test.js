global.mxpart = process.argv.splice(2);
process.env.NODE_ENV = 'development';
require('./test.auto.js')();
const webpack = require('webpack');
const webpackConfig = require('./webpack.test.js');
const ora = require('ora');



console.log(
    '  Tip:\n'
    + '  Built files are meant to be served over an HTTP server.\n'
    + '  Opening index.html over file:// won\'t work.\n',
);

const spinner = ora('building for testing...');
spinner.start();


webpack(webpackConfig,(err, stats)=>{
    spinner.stop();
    console.log(err);
    console.log(stats);
});
