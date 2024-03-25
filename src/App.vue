<script setup lang="ts">
import { onMounted, provide, reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const data = reactive({
    HelloWorldTwo: {},
});
setTimeout(() => {
    data.HelloWorldTwo = defineAsyncComponent(
        () => import("./components/HelloWorld.vue")
    );
}, 2000);
provide("abc", "App.vue");

type IObj = {
    name: string;
    address: string;
    age: string;
};

const obj: IObj = {};

const handleFromSon = () => {
    console.log("handleFromSon");
};


</script>

<template>
管理系统
</template>

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
