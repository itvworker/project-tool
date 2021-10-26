import { createApp } from 'vue'
import App from './App'
import routers from './router/index';

import './registerServiceWorker'
const app = createApp(App)


app.use(routers);
app.mount('#app')