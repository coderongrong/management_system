<template>
hellow ---- {{ roles }}
<el-button @click='updata'>updata</el-button>
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
</script>

<style scoped lang='less'>

</style>
