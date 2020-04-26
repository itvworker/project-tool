const fs = require('fs-extra')
const configJsPath = './src/config/index.js'
const configJsonPath = './build/config.json'
const cubePath = './CubeModule.json'
const apiJsPath = './src/model/url.js'
const entryPath = "./src/entry/main.js"




module.exports = function () {
    let file = fs.readFileSync(configJsPath, 'utf-8')
    let config = fs.readJsonSync(configJsonPath)
    let cube = fs.readJsonSync(cubePath)
    let files = fs.readdirSync('./zip')
    let entry =  fs.readFileSync(entryPath,  'utf-8' )

    let apptype = '员工端';
    if(mxpart[2] ==='door') {
        apptype="门卫端";
    }
   



        files.forEach(item => {
           
            if (item.indexOf(apptype +'-test-') > -1) {
                fs.removeSync('./zip/'+item)
            }
        })

        let version = config.environment.test[mxpart[0]].version;
        version = version.split('.');
        version[2] = parseInt(version[2]) + 1;
        version = version.join('.');
        let build = config.environment.test[mxpart[0]].build+1;
        config.environment.test[mxpart[0]].version = version
        config.environment.test[mxpart[0]].build = build

        let test = config.environment.test[mxpart[0]];

        for(let i in test){
            cube[i]= test[i]
        }

        var api = `
    /**
    * @description:接口地址配置
    * @author：xingwu.chen@partner.midea.com
    * @update:2017-08-16
    * @version
    */
    export default ${JSON.stringify(config.api[mxpart[1]], null, 4)}
    `


    file = file.replace(/type: '\w+'/, "type: 'test'")
    // .replace(/token: '\w+'/, "token: ''")
    .replace(/uid: '\w+'/, "uid: ''")
    .replace(/appType: '\w+'/, `appType: '${mxpart[2]}'`)   
    entry = entry.replace(/import router from '[\@|\w|\/]+'/ig, `import router from '@/router/${mxpart[2]}'`)
    
    
    
     console.log(entry);
        
    // 保存并写入文件中
    fs.writeFileSync(apiJsPath, api)
    fs.writeFileSync(configJsPath, file)
    fs.writeFileSync(configJsonPath, JSON.stringify(config, null, 4))
    fs.writeFileSync(cubePath, JSON.stringify(cube, null, 4))
    fs.writeFileSync(entryPath, entry)
    global.packageName = '物资出厂' + apptype +'-test-'+ version
   
}
