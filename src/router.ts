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
      path: '/showcase',
      name: 'Showcase',
      component: () => import('@/views/showcase'),
    },
    {
      path: '/examples',
      name: 'Examples',
      component: () => import('@/views/examples'),
    },
    {
      path: '/examples/line/radial-light',
      name: 'examples-line-01',
      component: () => import('@/views/examples/line/radialLight'),
    },
    {
      path: '/examples/line/waveform',
      name: 'examples-line-02',
      component: () => import('@/views/examples/line/waveform'),
    },
    {
      path: '/examples/network01',
      name: 'examples-network-01',
      component: () => import('@/views/examples/network/networkExample01'),
    },
    {
      path: '/examples/network02',
      name: 'examples-network-02',
      component: () => import('@/views/examples/network/networkExample02'),
    },
    {
      path: '/examples/points01',
      name: 'examples-points-01',
      component: () => import('@/views/examples/network/networkExample01'),
    },
    // Samples
    {
      path: '/examples/sample/line-with-point-movement-01',
      name: 'line-with-point-movement-01',
      component: () => import('@/views/examples/sample/lineWithPointMovement01'),
    },
    {
      path: '/examples/sample/line-with-point-movement-02',
      name: 'line-with-point-movement-02',
      component: () => import('@/views/examples/sample/lineWithPointMovement02'),
    },
    {
      path: '/examples/sample/line-with-point-movement-03',
      name: 'line-with-point-movement-03',
      component: () => import('@/views/examples/sample/lineWithPointMovement03'),
    },
    {
      path: '/examples/sample/line-with-point-movement-04',
      name: 'line-with-point-movement-04',
      component: () => import('@/views/examples/sample/lineWithPointMovement04'),
    },

    {
      path: '/workspace/tsne-viewer',
      name: 'tsne-viewer',
      component: () => import('@/views/workspace/tsneViewer'),
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
