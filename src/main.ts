import './assets/main.css'
import './assets/reset.css'

import { createApp } from 'vue'
import mock from './mocks/server'
import App from './App.vue'
import {router} from "@/router";
import {createPinia} from "pinia";

mock.start({
  onUnhandledRequest: 'bypass',
})

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia)
app.mount('#app')

