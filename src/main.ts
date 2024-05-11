import { createApp, h, inject, defineAsyncComponent, Suspense } from 'vue'
import { routes } from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
// import './style.css'
import './assets/css/common.less'
import './file.md'
import App from './App.vue'

import { createPinia } from 'pinia'

// ElementPlus ui组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import HellowWorld from './RenderComponents/HellowWorld.vue'
import Error from './RenderComponents/Error.vue'
import Loading from './RenderComponents/Loading.vue'

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

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./RenderComponents/HellowWorld.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: Loading,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 2000,

  // 加载失败后展示的组件
  errorComponent: Error,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})

// const app = createApp({
//   setup() {
//     // console.log(inject('message'))
//     console.log('Suspense', Suspense);
//     return () => {
//       // debugger
//       return h('div', {}, ['Suspense', h('div'), h(Suspense, {}, h(AsyncComp))])
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