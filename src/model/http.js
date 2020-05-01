/**
 * @description:统一请求方法 post get jsonp post_formData
 * @author：xingwu.chen@partner.midea.com  jiajun.he@partner.midea.com
 * @update:2017-08-16
 * @version
 */
import './apiInterceptor'
import axios from 'axios'
import QS from 'qs'
import URL from './url';

/**
 * 返回请求路径
 * @author ex_chennxw
 * @param urlTailStr
 */
/** ***************************** TODO 根据自己项目需求拼接url参数 ********************************************* */
function getRequestUrl(params) {
    if (typeof params === "string") {
        return URL.baseUrl + params;
    }
    if (params.prefix) {
        return URL[params.prefix] + params.url;
    }
    return URL.baseUrl = params.url
}

/** ***************************** TODO 根据自己项目需求拼接url参数 ********************************************* */
// 'https://newimtest.midea.com/mas-api/restful/acWorkingHoursFill/pjts/searchByUser?token=T2344189819503616'

function request(url, params, option) {
    params = params || {}
    option = option || {}


    let config = {}
    option.method = option.method.toLocaleUpperCase()// 请求方式全部转换为大写 "POST" "GET" "JSONP"
    const logError = function (msg, status, headers, config_) {
        try {
            const err = {}
            err.key = key
            err.params = params
            err.msg = msg
            err.status = status
            err.headers = headers
            err.config = config_
            console.error('_error', err)
            return err
        } catch (e) {
            console.error('_error', e)
            return e
        }
    }
    const extend = function (dst) {
        for (let i = 1, ii = arguments.length; i < ii; i++) {
            const obj = arguments[i]
            if (obj) {
                const keys = Object.keys(obj)
                for (let j = 0, jj = keys.length; j < jj; j++) {
                    const key = keys[j]
                    dst[key] = obj[key]
                }
            }
        }
        return dst
    }
    /**
     * @description:post
     * @param {*} params
     * @param {*}
     */
    const post = function (config) {
        return new Promise((resolve, reject) => {
            extend(config, {
                method: 'POST'
            })
            axios(config).then((rep) => {
                resolve(rep)
            }, (error) => {
                reject(error)
            })
        })
    }

    const put = function (config) {
        return new Promise((resolve, reject) => {
            extend(config, {
                method: 'PUT'
            })
            axios(config).then((rep) => {
                resolve(rep)
            }, (error) => {
                reject(error)
            })
        })
    }

    /**
     * @description:DELETE
     * @param {*} params
     * @param {*}
     */
    const DELETE = function (config) {
        return new Promise((resolve, reject) => {
            extend(config, {
                method: 'DELETE'
            })
            axios(config).then((rep) => {
                resolve(rep)
            }, (error) => {
                reject(error)
            })
        })
    }

    /**
     * @description:get
     * @param {*} params
     * @param {*}
     */
    const get = function (config) {
        return new Promise((resolve, reject) => {
            extend(config, {
                method: 'GET'
            })
            axios(config).then((rep) => {
                resolve(rep)
            }, (error) => {
                reject(error)
            })
        })
    }
    /**
     * @description:jsonp
     * @param {*} params
     * @param {*}
     */
    const getJsonpData = function (url, data, option) {
        url += (url.indexOf('?') < 0 ? '?' : '&') + $common.paramJsonp(data)
        return new Promise((resolve, reject) => {
            jsonp(url, option, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }

    config = extend({
        method: 'JSONP'
    }, option)
    let reqData = {}
    let headers = option.headers || {}
    switch (option.method) {
        case "POST_FILE":
            headers['Content-Type'] = 'application/octet-stream;charset=utf-8';
            reqData = {
                url,
                headers,
                data: params
            }
            config = extend(config, reqData)
            return post(config).then(res => res.data)
            break;
        case 'POST_JSON':
            headers['Content-Type'] = 'application/json'
            params = JSON.stringify(params)

            reqData = {
                url,
                headers,
                data: params
            }
            config = extend(config, reqData)
            return post(config).then(res => res.data)
            break
        case 'POST':
            params = QS.stringify(params, {allowDots: true})
            reqData = {
                url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: params
            }
            config = extend(config, reqData)
            return post(config).then(res => res.data)
            break
        case 'GET':
            reqData = {
                url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params
            }
            config = extend(config, reqData)
            return get(config).then(res => res.data)
            break
        case 'DELETE':
            params = QS.stringify(params, {allowDots: true})
            reqData = {
                url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: params
            }
            config = extend(config, reqData)
            return DELETE(config).then(res => res.data)
            break
        case 'JSONP':
            return getJsonpData(url, params, null).then(res => res)
            break
        case 'PUT':
            params = QS.stringify(params, {allowDots: true})
            reqData = {
                url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: params
            }
            config = extend(config, reqData)
            return put(config).then(res => res.data)
            break
        default:
            console.error('请求方式有误，请检查您的请求方式')
            break
    }
}

export {
    getRequestUrl, // 拼接url
    request // 请求
}
