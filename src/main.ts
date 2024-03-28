import { createApp } from 'vue'
import { routes } from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import './style.css'
import './assets/css/common.less'
import './file.md'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const router = createRouter({
  history: createWebHashHistory('/#/'),
  routes
})


const app = createApp(App).use(router).use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')