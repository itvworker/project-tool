import Vue from "vue";
import Vuex from "vuex";
import config from '@/config';
import mutations from './mutation'
import {getSession, getJsonSession} from "@/libs/tool";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        lang: 'cn',
        token: getSession(config.tokenKey),
        user: getJsonSession(config.userKey),
        multiple: getJsonSession('multiple'),
        one:getJsonSession('one'),
        power: {
            school: true,
            
        }
    },
    mutations
});

