import {getRequestUrl, request} from '../http'
import api from './api'
export default {
    list(params) {
        let url = getRequestUrl(api.list);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    updataSchool(params) {
        let url = getRequestUrl(api.);
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
    addGrade(params) {
        let url = getRequestUrl(api.addGrade);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    updataGrade(params) {
        let url =  getRequestUrl(api.updataGrade);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    listGrade(params) {
        let url =  getRequestUrl(api.listGrade);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    addStudent(params) {
        let url =  getRequestUrl(api.addStudent);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    updateStudent(params) {
        let url =  getRequestUrl(api.updataStudent);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    addGuard(params) {
        let url =  getRequestUrl(api.addGuard);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    updataGuard(params) {
        let url =  getRequestUrl(api.addGuard);
        return request(url, params, {
            method: 'POST_JSON'
        })
    },
    
    
}