export default [
    {
    path: '/doc/toast',
    name: 'itv_doc_toast',
    component: () => import ('@/components/toast/doc.vue'),
    meta: {
        keepAlive: false,
        title: '首页'
        }
    }
]
