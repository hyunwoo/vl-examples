import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    themes: {
      // dark: {
      //   primary: '#FFF',
      //   secondary: '#1697F6',
      //   accent: '#8D99AE'
      // }
    }
  },
  icons: {
    iconfont: 'mdi',
  },
});
