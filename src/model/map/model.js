import {getRequestUrl, request} from '../http'
import api from './api'


const key = 'XWWBZ-RBM33-HSX3N-3VCZF-MMCUE-5WFJF';
const mapurl = 'https://apis.map.qq.com';
export default {
    getIpGps() {
        let url = mapurl+ api.getIpGps;
        let params= {
            key: key
        }
        return request(url, params, {
            method: 'GET'
        })
    },
    searhAddress(params) {
        let url = mapurl+ api.searhAddress;
        params.key = key;
        return request(url, params, {
            method: 'GET'
        })
    },
    getAdress(params) {
        let url = mapurl+ api.getAdress;
        params.key = key;
        return request(url, params, {
            method: 'GET'
        })
    }
}