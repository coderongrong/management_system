<template>
  <el-button @click="updata"><slot></slot></el-button>
  hellow ---- {{ roles }}
  <h4>{{ result }}</h4>
  <!-- <input v-focus /> -->
</template>

<script setup>
import { userRole } from '@/pinia'
import { storeToRefs } from 'pinia'

const store = userRole()
const { updataRole } = store

const { roles } = storeToRefs(store)

const updata = () => {
  updataRole('x')
}

const result = inject('key')

// 自定义指令
// const vFocus = {
//   mounted: (el) => el.focus()
// };
// [1, 2, 3].reduce((x, y) => {
//   console.log('reduce', x, y)
//   return 1005
// })
</script>

<style scoped lang='less'>
</style>
