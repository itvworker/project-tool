import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/index',
        component: () => import('@/layouts/index.vue'),
        children: [
            {
                path: '/index',
                component: () => import('@/views/index/index.vue')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }
]

export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes // `routes: routes` 的缩写
})