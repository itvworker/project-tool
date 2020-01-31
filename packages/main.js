import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import i18n from '@/lang'
// ;
import 'lib-flexible'
import '@/layout'
import '@/components'
import '@/assets/css/index.less';

// import LoadingPlugin  from 'vux/src/plugins/loading'
// Vue.use(LoadingPlugin)
new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
