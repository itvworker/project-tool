export default [
    {
        type: 'link',
        label: '首页',
        icon: 'icon-home',
        path: '/index'
    },
    {
        type: 'menu',
        label: '表单组件',
        icon: '',
        children: [
            {
                type: 'link',
                label: '选择类组件',
                path: '/form/select'
            },
            {
                type: 'link',
                label: '角色管理',
                path: '/sytem/role'
            }
        ]
    },
    {
        type: 'menu',
        label: '系统管理',
        icon: '',
        children: [
            {
                type: 'link',
                label: '用户管理',
                path: '/sytem/user'
            },
            {
                type: 'link',
                label: '角色管理',
                path: '/sytem/role'
            }
        ]
    }
]