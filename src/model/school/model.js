import {getRequestUrl, request} from '../http'
import api from './api'
export default {
    list(params) {
        let url = getRequestUrl(api.list);
        return request(url, params, {
            method: 'POST_FILE'
        })
    },
    updateSchool(params) {
        let url = getRequestUrl(api.updateSchool);
        return request(url, params, {
            method: 'POST_JSON'
        })    
    },
    addSchool(params) {
        let url = getRequestUrl(api.addSchool);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    importSchool(params) {
        let url = getRequestUrl(api.importShcool)
        return request(url, params, {
            method: 'POST_FILE'
        })
    },
    importStudent(params) {
        let url = getRequestUrl(api.importShcool)
        return request(url, params, {
            method: 'POST_FILE'
        })
    },
    i

}