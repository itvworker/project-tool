import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
        component: () => import('@/App.vue'),
        redirect: '/demo/index',
        children: [
            {
                path: '/demo/index',
                component: () => import('@/view/demo/index.vue')
            },
            {
                path: '/demo/swiper-mini',
                component: () => import('@/mobile/swiper-mini/demo/index.vue')
            },
            {
                path: '/demo/scroller',
                component: () => import('@/mobile/scroller/demo/index.vue')
            },
            {
                path: '/demo/scroller/evelator',
                component: () => import('@/mobile/scroller/demo/evelator.vue')
            },
            {
                path: '/demo/scroller/produce',
                component: () => import('@/mobile/scroller/demo/produce.vue')
            },
            {
                path: '/demo/scroller/list',
                component: () => import('@/mobile/scroller/demo/list.vue')
            },
            {
                path: '/demo/scroller/horizontal',
                component: () => import('@/mobile/scroller/demo/horizontal.vue')
            },
            {
                path: '/demo/scroller/freedom',
                component: () => import('@/mobile/scroller/demo/freedom.vue')
            },
            {
                path: '/demo/scale',
                component: () => import('@/mobile/scale/demo/index.vue')
            },
            {
                path: '/demo/images-preview',
                component: () => import('@/mobile/images-preview/demo/index.vue')
            }
        ]
    }
]

export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes // `routes: routes` 的缩写
})
