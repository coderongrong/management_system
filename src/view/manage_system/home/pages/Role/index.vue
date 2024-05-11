<template>
  <AsyncComp>store</AsyncComp>
  <div>{{ roles }} --- {{ store.roles }}</div>
  <h4>provide inject</h4>
  <render />
</template>

<script setup>
import Hellow from './components/Hellow.vue'
import render from './components/render'
import { userRole } from '@/pinia'
import { storeToRefs } from 'pinia'

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/Hellow.vue'),

  // 加载异步组件时使用的组件
  //   loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 1000,

  // 加载失败后展示的组件
  //   errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})

const store = userRole()
const { roles } = storeToRefs(store)

provide('key', ref(10000))

const state =  reactive({name: 1})

// console.log(state, toRaw(state), state['__v_raw'])

</script>

<style scoped lang='less'>
</style>