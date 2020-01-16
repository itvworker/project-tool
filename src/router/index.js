import Vue from 'vue'
import Router from 'vue-router'
import UserModule from './user'

Vue.use(Router);
export default new Router({
    routes: [
        ...UserModule,
        {
            path: '*',
            redirect: '/'
        }
    ]
})
