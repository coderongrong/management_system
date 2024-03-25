<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
onMounted(() => {})
</script>

<style scoped lang='less'>
@import "@/assets/css/common.less";

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
.main {
    .box {
        color: @primary-red;
    }
}
</style>
