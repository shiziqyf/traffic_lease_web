import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/index',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '首页' }
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
                    path: '/charge',
                    component: () => import('../components/page/Charge.vue'),
                    meta: { title: 'Charge' }
                },


                {
                    path: '/admin',
                    component: () => import('../components/page/Admin.vue'),
                    meta: { title: '管理员' }
                },

                {
                    path: '/lease/leaseChart',
                    component: () => import('../components/page/LeaseChart.vue'),
                    meta: { title: '统计分析' }
                },
               
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                },
             
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
