import Vue from 'vue';
import PageContainer from './page-container';
import PageHeader from './page-header';
import PageMain from './page-main';
import Scroller from './vue-scroll/components/Scroller'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



const components = [PageContainer, PageHeader, PageMain, Scroller];

Vue.use(ElementUI)
components.forEach((item)=>{
    Vue.component(item.name, item)
});

