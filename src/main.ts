import Vue from 'vue';
import App from '@/app';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import '@/plugins/ant';
import AppBar from '@/components/appBar';
import UrlListContainer from '@/components/urlListContainer';
import ExampleContainer from '@/components/exampleContainer';



// Vue.use(Antd);

sync(store, router);

Vue.config.productionTip = false;


Vue.component('AppBar', AppBar);
Vue.component('UrlListContainer', UrlListContainer);
Vue.component('ExampleContainer', ExampleContainer);


new Vue({
  router,
  // store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app');
