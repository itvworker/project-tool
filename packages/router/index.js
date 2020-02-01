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
        path: '/demo',
        name: 'itv_dome',
        component: () => import ('@/pages/demo.vue'),
        meta: {
            keepAlive: false,
            title: '首页'
            }
        },
        {
        path: '/demo/picker',
        name: 'itv_picker',
        component: () => import ('@/components/picker/demo.vue'),
        meta: {
            keepAlive: false,
            title: 'picker'
            }
        },
        {
        path: '/demo/cliper',
        name: 'itv_cliper',
        component: () => import ('@/components/cliper/demo.vue'),
        meta: {
            keepAlive: false,
            title: 'cliper'
            }
        },
        // {
        // path: '/demo/toast',
        // name: 'itv_toast',
        // component: () => import ('@/components/toast/demo.vue'),
        // meta: {
        //     keepAlive: false,
        //     title: 'cliper'
        //     }
        // },
        {
        path: '/demo/cell',
        name: 'itv_cell',
        component: () => import ('@/components/cell/demo.vue'),
        meta: {
            keepAlive: false,
            title: 'cliper'
            }
        }
    ]
})
