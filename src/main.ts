import Vue from 'vue';
import App from '@/app';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import three from 'three';

sync(store, router);



Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app');
