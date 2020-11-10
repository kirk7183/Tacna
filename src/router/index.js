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
                    import ('../views/Meni/Obavestenja.vue')
            },
            {
                path: '/aukcija',
                name: 'Aukcija',
                component: () =>
                    import ('../views/Meni/Aukcija.vue')
            },
            {
                path: '/popusti',
                name: 'Popusti',
                component: () =>
                    import ('../views/Meni/Popusti.vue')
            },
            {
                path: '/nudim',
                name: 'Nudim',
                component: () =>
                    import ('../views/Meni/Nudim.vue')
            },
            {
                path: '/trazim',
                name: 'Trazim',
                component: () =>
                    import ('../views/Meni/Trazim.vue')
            },
            {
                path: '/solidarnost_online',
                name: 'Solidarnost_online',
                component: () =>
                    import ('../views/Meni/Solidarnost_online/Solidarnost_online.vue'),
                children: [{
                        path: '/solidarnost_online/info',
                        name: 'Info',
                        component: () =>
                            import ('../views/Meni/Solidarnost_online/Info.vue')
                    },
                    {
                        path: '/solidarnost_online/obavestenje_so',
                        name: '/Obavestenje_so',
                        component: () =>
                            import ('../views/Meni/Solidarnost_online/Obavestenje_so.vue')
                    },
                    {
                        path: '/solidarnost_online/licitacija_so',
                        name: 'Licitacija_so',
                        component: () =>
                            import ('../views/Meni/Solidarnost_online/Licitacija_so.vue')
                    },
                    {
                        path: '/solidarnost_online/banka_so',
                        name: 'Banka_so',
                        component: () =>
                            import ('../views/Meni/Solidarnost_online/Banka_so.vue')
                    }
                ]
            },
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