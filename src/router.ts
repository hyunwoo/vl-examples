import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/examples/line01',
      name: 'examples-line-01',
      component: () => import('@/views/examples/lineExample01'),
    },
    {
      path: '/examples/line02',
      name: 'examples-line-02',
      component: () => import('@/views/examples/lineExample02'),
    },
    {
      path: '/examples/points01',
      name: 'examples-points-01',
      component: () => import('@/views/examples/pointExample'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
