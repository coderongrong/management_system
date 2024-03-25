


export const routes: any = [
    { 
        path: '/',
        component: () => import('@/view/manage_system/home/index.vue')
    },
    { 
        path: '/home',
        name: 'home',
        component: () => import('@/view/manage_system/home/index.vue')
    },
    { 
        path: '/about',
        name: 'about',
        component: () => import('@/view/manage_system/about/index.vue')
    }
]