import Vue from 'vue'
import App from './App.vue'
import router from '@/router/door';
import store from '@/store';
import i18n from '@/lang'
import 'lib-flexible'
import '@/model';//服务数据层
import '@/components';
import FastClick from 'fastclick'
// import vconsole from 'vconsole'
// new vconsole();




FastClick.attach(document.body)
Vue.prototype.$bus = new Vue();
Vue.config.devtools = process.env.NODE_ENV;
new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app');
