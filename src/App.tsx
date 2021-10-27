
import { defineComponent } from 'vue'
import "./App.less";
import {RouterView} from 'vue-router';
export default defineComponent({
    name: 'App',
    setup() {
      return () =>  <RouterView />
    }
})

