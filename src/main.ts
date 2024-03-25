import { createApp } from 'vue'
import { routes } from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import './file.md'
import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory('/#/'),
  routes
})


createApp(App).use(router).mount('#app')
