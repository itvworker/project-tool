import {getRequestUrl, request} from '../http'
import api from './api'
export default {
    list(params) {
        let url = getRequestUrl(api.list);
        return request(url, params, {
            method: 'POST_FILE'
        })
    },
    add(params) {
        let url = getRequestUrl(api.add);
        return request(url, params, {
            method: 'POST'
        })
    }
}