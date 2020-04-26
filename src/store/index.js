import Vue from "vue";
import Vuex from "vuex";
import config from '@/config';
import mutations from './mutation'


Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        lang: 'cn',
        token: config.token,
        uid: config.uid,
        extra: ''
    },
    mutations
});
