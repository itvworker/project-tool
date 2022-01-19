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
            },
            {
                path: '/about',
                component: () => import('@/views/about/index.vue')
            },
            {
                path: '/pc',
                component: () => import('@/views/pc/index.vue')
            },
            {
                path: '/mobile',
                component: () => import('@/views/mobile/index.vue')
            }
        ]
    },
    {
        path: '/demo',
        component: () => import('@/views/demo/index.vue')
    },
    {
        path: '/demo/swiper-mini',
        component: () => import('@/mobile/swiper-mini/demo/index.vue')
    },
    {
        path: '/demo/scroller',
        component: () => import('@/mobile/scroller/demo/index.vue')
    }
]

export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes // `routes: routes` 的缩写
})