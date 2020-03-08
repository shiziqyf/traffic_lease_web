import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/car',
                    component: () => import('../components/page/Car.vue'),
                    meta: { title: '车辆管理' }
                },
                {
                    path: '/car/map',
                    component: () => import('../components/page/Carmap.vue'),
                    meta: { title: '地图' }
                },

                {
                    path: '/lease',
                    component: () => import('../components/page/Lease.vue'),
                    meta: { title: '租赁' }
                },
                {
                    path: '/user',
                    component: () => import('../components/page/User.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/lease/line/:id',
                    component: () => import('../components/page/LeaseLine.vue'),
                    meta: { title: '路线' }
                },


                {
                    path: '/admin',
                    component: () => import('../components/page/Admin.vue'),
                    meta: { title: '路线' }
                },
               
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
             
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
