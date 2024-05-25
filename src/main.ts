import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import "element-plus/dist/index.css"
import "./assets/icomoon/style.css"
import "./assets/scss/all.scss"

const pinia = createPinia()
const app = createApp(App)
    app.use(pinia)
    app.use(router)
app.mount('#app')
