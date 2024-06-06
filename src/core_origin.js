import {createApp, h, createRenderer} from './vue_main'
import App from './App.vue'

// const { render, createApp } = createRenderer({
//   patchProp,
//   insert,
//   remove,
//   createElement
//   // ...
// })

const component = {
  template: '<h1>h1</h1>',
  render(){
    const t = h('p', 'ppp')
    console.log('t', t)
    return t
  }
}

const app = createApp(App)

app.mount('#app')