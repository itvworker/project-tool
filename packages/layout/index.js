import Vue from "vue";
import ItvContainer from "./container.vue";
import ItvMain from "./main.vue";
import ItvHeader from "./header.vue";


const Layout = {
  ItvContainer,
  ItvMain,
  ItvHeader
};

Object.keys(Layout).forEach((item, index, arr) => {
  Vue.component(item, Layout[item]);
});

Vue.prototype.$bus = new Vue();
