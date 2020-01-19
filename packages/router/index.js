import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    routes: [
        {
        path: '/',
        name: 'itv_home',
        component: () => import ('@/pages/index.vue'),
        meta: {
            keepAlive: false,
            title: '首页'
            }
        },
        {
        path: '/packages/picker',
        name: 'itv_picker',
        component: () => import ('@/components/picker/demo.vue'),
        meta: {
            keepAlive: false,
            title: 'picker'
            }
        },
        {
        path: '/packages/cliper',
        name: 'itv_cliper',
        component: () => import ('@/components/cliper/demo.vue'),
        meta: {
            keepAlive: false,
            title: 'cliper'
            }
        }
    ]
})
