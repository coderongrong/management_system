import { reactive, /* createApp */ } from './vue_main'
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
      // state.name = 'yyyyyyyyyyyy'
      // state.age = '15'
      state.show = false
    }, 1000)
    const fn = () => {
      console.log('fn')
    }
    return () => {
      return state.show
        ? h('p', [
          h('li', { key: 'a' }, 'a'),
          h('li', { key: 'b', color: 'red' }, 'b'),
          h('li', { key: 'c' }, 'c'),
          h('li', { key: 'd' }, 'd'),
          h('li', { key: 'e' }, 'e'),
          h('li', { key: 'q' }, 'q'),
          h('li', { key: 'f' }, 'f'),
          h('li', { key: 'g' }, 'g')
        ])
        : h('p', {}, [
          h('li', { key: 'a' }, 'a'),
          h('li', { key: 'b', color: 'red' }, 'b'),
          h('li', { key: 'e' }, 'e'),
          h('li', { key: 'c' }, 'c'),
          h('li', { key: 'd' }, 'd'),
          h('li', { key: 'h' }, 'h'),
          h('li', { key: 'f' }, 'f'),
          h('li', { key: 'g' }, 'g')
        ])
    }
  },
  render(proxy) {
    console.log(proxy)
    return h('h1', ['ppp', 'zzzzzzzzz', proxy.name, proxy.age])
  }
}

const app = createApp(component)
app.mount('#app')

