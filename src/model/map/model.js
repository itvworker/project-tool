import {getRequestUrl, request} from '../http'
import api from './api'
import md5 from 'md5'

const key = 'XWWBZ-RBM33-HSX3N-3VCZF-MMCUE-5WFJF';
const mapurl = 'https://apis.map.qq.com';
const sig = 'zTcNpa3dRwFMdOFBLgq1NP7hAH6dD8Qu'



export default {
    getIpGps() {
        let url = mapurl+ api.getIpGps;
       

        let params= {
            key: key,
            output:'jsonp'
        }
        return request(url, params, {
            method: 'JSONP'
        })
    },
    searhAddress(params) {
        let url = mapurl+ api.searhAddress;
        params.key = key;
        params.output ='jsonp'
        return request(url, params, {
            method: 'JSONP'
        })
    },
    getAdress(params) {
        let url = mapurl+ api.getAdress;
        params.key = key;
        params.output ='jsonp'
        return request(url, params, {
            method: 'JSONP'
        })
    }
}