import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import "./assets/icomoon/style.css"
import "./assets/scss/all.scss"
createApp(App)
    .use(router)
.mount('#app')
