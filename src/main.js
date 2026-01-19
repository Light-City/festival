import { createApp } from 'vue'
import App from './APP.VUE'
import router from './router/index.js'
import './assets/css/compatibility.css'

const app = createApp(App)
app.use(router)
app.mount('#app')