import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "history" */ '@/views/IndexView.vue'),
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import(/* webpackChunkName: "history" */ '@/views/resource/IndexView.vue'),
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import(/* webpackChunkName: "history" */ '@/views/tag/IndexView.vue'),
  },
  {
    path: '/govern',
    name: 'govern',
    component: () => import(/* webpackChunkName: "history" */ '@/views/govern/IndexView.vue'),
  },
  {
    path: '/ledger',
    name: 'ledger',
    component: () => import(/* webpackChunkName: "history" */ '@/views/ledger/IndexView.vue'),
  },
  {
    path: '/workflow',
    name: 'workflow',
    component: () => import(/* webpackChunkName: "history" */ '@/views/workflow/IndexView.vue'),
  },
  {
    path: '/system',
    name: 'system',
    component: () => import(/* webpackChunkName: "history" */ '@/views/system/IndexView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "history" */ '@/views/LoginView.vue'),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "device" */ '@/views/ErrorView.vue'),
  }
];

const router = new VueRouter({
  routes,
});

export default router;
