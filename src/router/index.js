import Vue from 'vue'
import Router from 'vue-router'
import UserModule from './user'
import Packages from './packages'

Vue.use(Router);
export default new Router({
    routes: [
        ...UserModule,
        ...Packages,
        {
            path: '*',
            redirect: '/'
        }
    ]
})
