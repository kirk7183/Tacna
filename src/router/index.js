import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '@/views/main/Intro.vue'
import Home from '@/views/main/Home.vue'

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
            import ('@/views/main/NotFound.vue')
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
                    import ('../views/glavni_meni/Obavestenja.vue')
            },
            {
                path: '/licitacije',
                name: 'Licitacije',
                component: () =>
                    import ('../views/glavni_meni/Licitacije.vue')
            },
            {
                path: '/popusti',
                name: 'Popusti',
                component: () =>
                    import ('../views/glavni_meni/Popusti.vue')
            },
            {
                path: '/nudim',
                name: 'Nudim',
                component: () =>
                    import ('../views/glavni_meni/Nudim.vue')
            },
            {
                path: '/trazim',
                name: 'Trazim',
                component: () =>
                    import ('../views/glavni_meni/Trazim.vue')
            },
            {
                path: '/izgubljeno_nadjeno',
                name: 'Izgubljeno_nadjeno',
                component: () =>
                    import ('../views/glavni_meni/Izgubljeno_nadjeno.vue')
            },
            {
                path: '/solidarnost_online',
                name: 'Solidarnost_online',
                redirect: '/solidarnost_online/o_nama_so',
                component: () =>
                    import ('../views/glavni_meni/Solidarnost_online.vue'),
                //CHILDRED !!!!
                children: [{
                        path: '/solidarnost_online/o_nama_so',
                        name: 'O_nama_so',
                        component: () =>
                            import ('@/components/solidarnost_online/O_nama_so.vue')
                    },
                    {
                        path: '/solidarnost_online/obavestenja_so',
                        name: 'Obavestenja_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Obavestenja_so.vue')
                    },
                    {
                        path: '/solidarnost_online/donacije_so',
                        name: 'Donacije_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Donacije_so.vue')
                    },
                    {
                        path: '/solidarnost_online/licitacije_so',
                        name: 'Licitacije_so',
                        component: () =>
                            import ('@/components/solidarnost_online/Licitacije_so.vue')
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
            import ( /* webpackChunkName: "about" */ '../views/main/About.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router