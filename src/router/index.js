import Vue from 'vue'
import Router from 'vue-router'
import guard from './guard'
Vue.use(Router);
const router =  new Router({
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
                },
                {
                    path: '/school/index',
                    name: 'school_index',
                    component: () => import ('@/pages/school/index'),
                    meta: {
                        keepAlive: true,
                        title: '学校管理'
                    }
                },
                {
                    path: '/school/grade',
                    name: 'school_grade',
                    component: () => import ('@/pages/school/grade'),
                    meta: {
                        keepAlive: true,
                        title: '班级管理'
                    }
                },
                {
                    path: '/school/students',
                    name: 'school_students',
                    component: () => import ('@/pages/school/students'),
                    meta: {
                        keepAlive: true,
                        title: '学生管理'
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




guard(router)


export default router
