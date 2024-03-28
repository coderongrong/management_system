


export const routes: any = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/view/manage_system/home/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/homePages',
        component: () => import('@/view/manage_system/home/index.vue'),
        children: [
            {
                path: '/homePages',
                name: 'homePages',
                component: () => import('@/view/manage_system/home/pages/FPages/index.vue'),
            },
            {
                path: '/book',
                name: 'book',
                component: () => import('@/view/manage_system/home/pages/ManageBook/index.vue'),
            },
            {
                path: '/cate',
                name: 'cate',
                component: () => import('@/view/manage_system/home/pages/Cate/index.vue'),
            },
            {
                path: '/lookBook',
                name: 'lookBook',
                component: () => import('@/view/manage_system/home/pages/LookBook/index.vue'),
            },
            {
                path: '/conso',
                name: 'conso',
                component: () => import('@/view/manage_system/home/pages/Conso/index.vue'),
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('@/view/manage_system/home/pages/User/index.vue'),
            },
            {
                path: '/role',
                name: 'role',
                component: () => import('@/view/manage_system/home/pages/Role/index.vue'),
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/view/manage_system/about/index.vue')
    }
]