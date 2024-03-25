<script setup lang='ts'>
const emit = defineEmits<{
  (e: 'changeSon', id: string): void
}>()

const props = defineProps<{ msg: string }>()

const count = ref(0)
const res = inject('abc')
// console.log('res --------->', res);

const handleToP = () => {
  emit('changeSon', 'son')
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click='handleToP'>handleToP</button>
  <slot></slot>
  <h3> HelloWorld ---- {{ count }}</h3>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
