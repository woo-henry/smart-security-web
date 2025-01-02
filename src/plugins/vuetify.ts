import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { zhHans } from 'vuetify/src/locale';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  theme: {
    dark: false
  }
});
