import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import ('@/pages/layout/index'),
            redirect: '/index',
            meta: {
                keepAlive: true,
                title: '物资放行'
            },
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: () => import ('@/pages/index'),
                    meta: {
                        keepAlive: true,
                        title: '物资放行'
                    }
                }
            ]
        },


        {
            path: '/login',
            name: 'login',
            component: () => import ('@/pages/login'),
            meta: {
                keepAlive: true,
                title: '物资放行'
            }
        }
    ]
})
