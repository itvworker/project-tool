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
            component: () => import ('@/pages/index/index.vue'),
            meta: {
                keepAlive: true,
                title: '物资放行'
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import ('@/pages/detail/detail.vue'),
            meta: {
                keepAlive: false,
                title: '物资放行'
            }
        }
    ]
})
