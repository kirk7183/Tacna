import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '@/views/Intro.vue'
import Home from '../views/Home.vue'

//resava problem kada dva puta kliknemo na isti link i ponavlja se komanda PUSH
//tada izbacuje gresku "NavigationDuplicated"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [{
        path: '*',
        name: '404',
        component: () =>
            import ('@/views/NotFound.vue')
    },
    {
        path: '/',
        name: 'Intro',
        component: Intro
    },
    {
        path: '/home',
        name: 'Home',
        redirect: 'obavestenja',
        component: Home,
        children: [{
                path: '/obavestenja',
                name: 'Obavestenja',
                component: () =>
                    import ('../components/Obavestenja.vue')
            },
            {
                path: '/aukcija',
                name: 'Aukcija',
                component: () =>
                    import ('../views/Aukcija.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router