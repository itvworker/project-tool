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
                component: () => import('@/views/demo/index.vue')
            },
            {
                path: '/demo/swiper-mini',
                component: () => import('@/mobile/SwiperMini/demo/index.vue')
            },
            {
                path: '/demo/scroller',
                component: () => import('@/mobile/Scroller/demo/index.vue')
            },
            {
                path: '/demo/scroller/evelator',
                component: () => import('@/mobile/Scroller/demo/evelator.vue')
            },
            {
                path: '/demo/scroller/produce',
                component: () => import('@/mobile/Scroller/demo/produce.vue')
            },
            {
                path: '/demo/scroller/list',
                component: () => import('@/mobile/Scroller/demo/list.vue')
            },
            {
                path: '/demo/scroller/horizontal',
                component: () => import('@/mobile/Scroller/demo/horizontal.vue')
            },
            {
                path: '/demo/scroller/freedom',
                component: () => import('@/mobile/Scroller/demo/freedom.vue')
            },
            {
                path: '/demo/scale',
                component: () => import('@/mobile/Scale/demo/index.vue')
            },
            {
                path: '/demo/images-preview',
                component: () => import('@/mobile/ImagesPreview/demo/index.vue')
            },
            {
                path: '/demo/picker',
                component: () => import('@/mobile/Picker/demo/index.vue')
            },
            {
                path: '/demo/dialog',
                component: () => import('@/mobile/Dialog/demo/index.vue')
            },
            {
                path: '/demo/picker-time',
                component: () => import('@/mobile/PickerTime/demo/index.vue')
            },
            {
                path: '/demo/calendar-time',
                component: () => import('@/mobile/CalendarTime/demo/index.vue')
            }
        ]
    }
]

export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes // `routes: routes` 的缩写
})
