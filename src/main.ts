import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import 'primevue/resources/themes/aura-light-green/theme.css'

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue)
app.use(pinia)
app.use(router)

app.mount('#app')
