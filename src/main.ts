import 'vue3-toastify/dist/index.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)
app.use(Vue3Toastify, {
  autoClose: 5000
} as ToastContainerOptions)

app.mount('#app')
