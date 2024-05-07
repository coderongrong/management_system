import { createApp, h, inject, defineAsyncComponent } from 'vue'
import { routes } from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import './style.css'
import './assets/css/common.less'
import './file.md'
import App from './App.vue'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import HellowWorld from './RenderComponents/HellowWorld.vue'

const router = createRouter({
  history: createWebHashHistory('/#/'),
  routes
});

// const AsyncComp = defineAsyncComponent(() =>
//   import('./RenderComponents/HellowWorld.vue')
// )

router.beforeEach((to, from) => {
  // 获取当前路由信息
  const currentRouter = to
  // console.log('to, from', currentRouter, from);
  if (from.name) {
    // return
  }
})

// const app = createApp({
//   setup() {
//     console.log(inject('message'))
//     return () => {
//       // debugger
//       return h('div', {}, ['asgdhagsdh', h(HellowWorld)])
//     }
//   }
// }).use(ElementPlus)
// app.provide('message', 'hello message')


const app = createApp(App).use(ElementPlus).use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

app.use(pinia)
app.mount('#app')


// useName: https://120.26.217.111:18660/08f8e7b8  use: 2oihtm7r  pw: Rqw123456 