import { createApp } from 'vue'
import { routes } from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import './style.css'
import './assets/css/common.less'
import './file.md'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const router = createRouter({
  history: createWebHashHistory('/#/'),
  routes
})


createApp(App).use(router).use(ElementPlus).mount('#app')
