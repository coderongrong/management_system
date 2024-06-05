import { createApp, h, inject, defineAsyncComponent, Suspense } from 'vue'
// import './style.css'
import './assets/css/common.less'
import './file.md'
import App from './App.vue'

const obj = {
  render() {
    return h('p', '456')
  }
}
const obj1 = {
  render() {
    return h('h1', '456')
  }
}
const vnode = createApp(obj)
vnode.mount('#box')



const app = createApp(App)
app.mount('#app')

