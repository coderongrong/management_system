import { reactive } from './vue_main'
import { createApp, h } from './vue_core'
import App from './App.vue'

// const { render, createApp } = createRenderer({
//   patchProp,
//   insert,
//   remove,
//   createElement
//   // ...
// })

const component = {
  setup(props, context) {
    // console.log('ok', props, context)
    const state = reactive({ name: 'xxxxxxx', age: 18, show: true })
    setTimeout(() => {
      state.name = 'yyyyyyyyyyyy'
      state.age = 'yyyyyyyyyyyy'
    }, 1000)
    const fn = () => {
      console.log('fn')
    }
    return () => {
      return state.show ? h('h1', { onClick: fn }, ['h1', 'zzzzzzzzz', state.name, state.age]) : h('p', { onClick: fn }, ['p', 'zzzzzzzzz', state.name, state.age])
    }
  },
  render(proxy) {
    console.log(proxy)
    return h('h1', ['ppp', 'zzzzzzzzz', proxy.name, proxy.age])
  }
}

const app = createApp(component)
app.mount('#app')

