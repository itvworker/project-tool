import {getRequestUrl, request} from './http'
import URL from './api.url'

export default {
    /**
     * 获取申请出厂的列表
     */
    getPersonList(params) {
        let url = getRequestUrl(URL.getPersonList);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },

    /**
     * 获取详情
     */
    getDetail(params) {
        let url = getRequestUrl(URL.getDetail);
        return request(url, params, {
            method: 'POST_JSON'
        })

    },
    /**
     * 扫码出入厂，设置出入厂状态
     */
    setOrderStatus(params) {
        let url = getRequestUrl(URL.setOrderStatus);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    /**
     * 确认异常
     */
    setUnnormal(params) {
        let url = getRequestUrl(URL.setUnnormal);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    /**
     * mes token
     */
    getToken(params) {
        let url = getRequestUrl(URL.getToken);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    /**
     * mes 出厂
     */
    setOutMes(params, headers) {
        let url = getRequestUrl({
            url: URL.setOutMes,
            prefix: 'mesUrl'
        })
        return request(url, params, {
            method: 'POST_JSON',
            headers
        })
    },
    /**
     * mes 返厂
     */
    setBackMes(params, headers) {
        let url = getRequestUrl({
            url: URL.setBackMes,
            prefix: 'mesUrl'
        });
        return request(url, params, {
            method: 'POST_JSON',
            headers
        })
    },

}
