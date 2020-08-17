import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../layouts/Default.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('../views/Home.vue')
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('../views/About.vue')
            },
            {
                path: '/posts/search',
                name: 'Search',
                component: () => import('../views/Search.vue')
            }
        ],
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
