/**
 * @description:http响应拦截器 全局处理loading加载效果
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */
import axios from 'axios'
import store from '@/store';

axios.defaults.timeout = 10000;

// http请求拦截器
var loadinginstace
var right = new Date().getTimezoneOffset() * 60 * 1000
var arr = ['beginTime', 'endTime', 'createDate', 'scorePublishTime', 'publishTime']
// 把格林威治时间调节为当前时区时间
function foreachJson (jsonObj, arr) {
    // 循环所有键
    for (var key in jsonObj) {
        var element = jsonObj[key]
        if (String(element).length > 0 && typeof (element) === 'object' || typeof (element) === 'object') {
            foreachJson(element, arr)
        } else { // 不是对象或数组、直接输出
            if (arr.indexOf(key) >= 0) {
                if (typeof element === 'number') {
                    let l = String(element).length
                    if (l === 13) {
                        jsonObj[key] = parseInt(element) - right
                    }
                }
            }
        }
    }
    return jsonObj
}
axios.interceptors.request.use(config => { // 请求前的处理
    config.headers['ping-an-cloud-token'] = store.state.token
   
    return config
}, error => {
    return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(async (res) => { // 请求后的处理



    return res
    // return foreachJson(data,arr)
}, error => {
    if(error==='Error: Network Error') {
        return Promise.reject({
                status: 400,
                msg: '网络错识'
            })
    }
    let errInfo = error.response

    // if (!errInfo) {
    //     Vue.$vux.toast.text('请求超时,请检查网络', 'middle')
    //     return Promise.reject({
    //         errCode: true,
    //         message: '请求超时,请检查网络'
    //     })
    // }
    // let errDetail = {
    //     errCode: true,
    //     message: ''
    // }
    // switch (errInfo.status) {
    // case 404:
    //     Vue.$vux.toast.text('接口信息不存在，请联系管理员', 'middle')
    //     errDetail = {
    //         errCode: 404,
    //         message: '接口信息不存在，请联系管理员'
    //     }
    //     break
    // case 401:
    //     Vue.$vux.toast.text('请登录', 'middle')
    //     errDetail = {
    //         errCode: 401,
    //         message: '请登录'
    //     }
    //
    //     break
    // case 502:
    //     Vue.$vux.toast.text('502错误，联系管理员', 'middle')
    //     errDetail = {
    //         errCode: 502,
    //         message: '502错误，联系管理员'
    //     }
    //     break
    // case 500:
    //     Vue.$vux.toast.text(errInfo.data.message, 'middle')
    //     errDetail = {
    //         errCode: 401,
    //         message: errInfo.data.message
    //     }
    //     break
    // }
    return Promise.reject(error)
})

function restart (config) {
    return new Promise(function (resolve, reject) {
        axios(config).then(rep => {
            resolve(rep)
        }, error => {
            reject(error)
        })
    })
}

export default axios
