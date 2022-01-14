export default [
    {
        type: 'link',
        label: '首页',
        icon: '',
        path: '/index'
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