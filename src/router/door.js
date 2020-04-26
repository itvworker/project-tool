import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/error',
            name: 'error',
            component: () => import ('@/pages/entry/entry.vue'),
            meta: {
                keepAlive: false,
                title: '错误页面'
            }
        },
    
       
        {
            path: '/',
            name: 'home',
            component: () => import ('@/pages/doorkeeper/doorkeeper.vue'),
            meta: {
                keepAlive: false,
                title: '物资放行'
            }
        },
        {
            path: '/success',
            name: 'success',
            component: () => import ('@/pages/doorkeeper/success.vue'),
            meta: {
                keepAlive: true,
                title: '物资放行'
            }
        },
        {
            path: '/list',
            name: 'list',
            component: () => import ('@/pages/doorkeeper/list.vue'),
            meta: {
                keepAlive: false,
                title: '物资放行'
            }
        }
    ]
})
