import { createApp } from 'vue'
import Componets from '@/components/index'
import App from '@/App.vue'
import './App.less'
import routers from './router/index'
import i18n from './langs'
import './registerServiceWorker'
import '@/assets/css/index.scss'
// import vconsole from 'vconsole'
import '@/libs/forbid'
// new vconsole()
const app = createApp(App)

Componets(app)
app.use(routers)
app.use(i18n)
app.mount('#app')

