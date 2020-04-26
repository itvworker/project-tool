import Vue from 'vue';
import PageContainer from './page-container';
import PageHeader from './page-header';
import PageMain from './page-main';
import Scroller from './vue-scroll/components/Scroller'

import {toast, loading, confirm} from '@midea/pix-h5-components'



// import '@midea/pix-h5-components/dist/assets/fonts/iconfont.css'
// import loading from '@midea/pix-h5-components/dist/components/loading';
// import toast from '@midea/pix-h5-components/dist/components/toast';
// import '@midea/pix-h5-components/dist/components/loading/styles/loading.css';
// import '@midea/pix-h5-components/dist/components/toast/styles/toast.css';


const components = [PageContainer, PageHeader, PageMain,Scroller];

Vue.use(loading);
Vue.use(toast);
Vue.use(confirm)

components.forEach((item)=>{
    Vue.component(item.name, item)
});

