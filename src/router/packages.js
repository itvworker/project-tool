export default [{
            path: '/packages/picker',
            name: 'itv_picker',
            component: () => import ('$p/components/picker/demo.vue'),
            meta: {
                keepAlive: false,
                title: '课程分类'
            }
        }]
