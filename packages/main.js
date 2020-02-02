import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import i18n from '@/lang'

import 'lib-flexible'
import '@/layout'
import '@/components/index.js'
import '@/assets/css/index.less';

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
