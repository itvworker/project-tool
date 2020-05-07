import {getRequestUrl, request} from '../http'
import api from './api'
export default {
    setLogin(params) {
        let url = getRequestUrl(api.setLogin);
        return request(url, params, {
            method: 'POST_JSON'
        })
    }
}