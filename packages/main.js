import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import i18n from '@/lang';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'lib-flexible'
import '@/layout'
import '@/components/index.js'
import '@/assets/css/index.less';




Vue.prototype.hljs = function() {
  const preEl = document.querySelectorAll('pre')
  preEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
}

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
