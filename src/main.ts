import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import print from 'vue3-print-nb'

import "element-plus/dist/index.css"
import "./assets/icomoon/style.css"
import "./assets/scss/all.scss"
import "@/assets/css/hover.css"
import '@/assets/css/swiper-bundle.css';

const pinia = createPinia()
const app = createApp(App)
    app.use(print)
    app.use(pinia)
    app.use(router)
app.mount('#app')
