<template>
    <div class='top'>图书管理</div>
    <div class='content'>
        <el-tabs type="border-card">
            <el-tab-pane label="所有图书">
                <AllBook />
            </el-tab-pane>
            <el-tab-pane label="我的借阅">我的借阅</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang='ts'>
import AllBook from './components/AllBook.vue'
import { getList } from '@/request/api'


onMounted(async () => {
    const list = await getList()
    console.log('list', list)
})
</script>

<style scoped lang='less'>
.top {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: rgb(245, 245, 245);
}
.content {
    height: calc(100% - 50px);
    .el-tabs {
        height: 100%;
        box-sizing: border-box;
    }
}
</style>