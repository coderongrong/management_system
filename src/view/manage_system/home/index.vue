<template>
  <el-col :span="3">
    <el-menu
      :uniqueOpened="true"
      :default-active="homePagesActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#03a9f4"
    >
      <el-menu-item index="homePages">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>系统首页</template>
      </el-menu-item>
      <el-menu-item index="book">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>图书管理</template>
      </el-menu-item>
      <el-menu-item index="cate">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>分类管理</template>
      </el-menu-item>
      <el-menu-item index="lookBook">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>借阅管理</template>
      </el-menu-item>
      <el-menu-item index="conso">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>系统日志管理</template>
      </el-menu-item>
      <el-menu-item index="user">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="role">
        <el-icon>
          <Notebook />
        </el-icon>
        <template #title>角色管理</template>
      </el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="21">
    <router-view></router-view>
  </el-col>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 属性页面时候的路由监控
router.push({
  name: route.path.split('/')[1]
})

const homePagesActive = ref('homePages')

// 点击菜单的回调
const handleOpen: (e: string) => void = (e: string): void => {
  router.push({
    name: e
  })
}

const handleClose: (e: string) => void = (e: string): void => {
  console.log(e)
}
</script>

<style scoped lang='less'>
.el-col {
  height: 100%;
}
.el-menu {
  height: 100%;
}
</style>