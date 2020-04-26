var pro = require('child_process')
const mxpart = process.argv.splice(2)
function packages (str) {
    return new Promise((resolve, reject) => {
        pro.exec(str, function (error, stdout, stderr) {
            console.log('error----------------------------');
            console.log(error);

            console.log('stdout----------------------------');
            console.log(stdout);
            resolve(error)
        })
    })
}
async function init() {
    let con = mxpart.splice(1).join(' ');
    switch (mxpart[0]) {
        case 'test':
            await packages('npm run testMx4');
            await packages('npm run testMx5');
            await packages('npm run testYx5');
            await packages('npm run testYx5uat');
            break;
        case 'pro':
            await packages('npm run mx4');
            await packages('npm run mx5');
            await packages('npm run yx');
            await pageages('npm run bc');
            break;
        case 'all':
             await packages('npm run testMx4');
             await packages('npm run testMx5');
             await packages('npm run testYx5')
             await packages('npm run mx4');
             await packages('npm run mx5');
             await packages('npm run yx5')
        default:

    }
}


//node index test mx4 testMx4



init()
