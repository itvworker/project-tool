import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import lang from '@/lang'
new Vue({
  router,
  lang,
  store,
  render: h => h(App),
}).$mount('#app')
