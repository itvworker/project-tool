import { createApp } from 'vue'
import App from './App.tsx'
import routers from './router/index.tsx';
const app = createApp(App)


app.use(routers);
app.mount('#app')