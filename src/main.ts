import './assets/styles.scss'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
// import 'primevue/resources/themes/lara-dark-indigo/theme.css'

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue)
app.use(pinia)
app.use(router)

app.mount('#app')
