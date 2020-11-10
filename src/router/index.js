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
        //CHILDRED !!!!
        children: [{
                path: '/obavestenja',
                name: 'Obavestenja',
                component: () =>
                    import ('../views/meni/Obavestenja.vue')
            },
            {
                path: '/aukcija',
                name: 'Aukcija',
                component: () =>
                    import ('../views/meni/Aukcija.vue')
            },
            {
                path: '/popusti',
                name: 'Popusti',
                component: () =>
                    import ('../views/meni/Popusti.vue')
            },
            {
                path: '/nudim',
                name: 'Nudim',
                component: () =>
                    import ('../views/meni/Nudim.vue')
            },
            {
                path: '/trazim',
                name: 'Trazim',
                component: () =>
                    import ('../views/meni/Trazim.vue')
            },
            {
                path: '/solidarnost_online',
                name: 'Solidarnost_online',
                redirect: '/solidarnost_online/info_so',
                component: () =>
                    import ('../views/meni/Solidarnost_online.vue'),
                //CHILDRED !!!!
                children: [{
                        path: '/solidarnost_online/info_so',
                        name: 'Info_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Info_so.vue')
                    },
                    {
                        path: '/solidarnost_online/obavestenje_so',
                        name: '/Obavestenje_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Obavestenje_so.vue')
                    },
                    {
                        path: '/solidarnost_online/licitacija_so',
                        name: 'Licitacija_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Licitacija_so.vue')
                    },
                    {
                        path: '/solidarnost_online/banka_so',
                        name: 'Banka_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Banka_so.vue')
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