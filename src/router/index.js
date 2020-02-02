import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home/:token',
        name: 'home',
        component: Home,
        props: true
    },
    {
        path: '/',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/community',
        name: 'community',
        component: () =>
            import ('../views/Community.vue')
    },
    {
        path: '/chat/:chatName',
        name: 'chat',
        props: true,
        component: () =>
            import ('../views/Chat.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router