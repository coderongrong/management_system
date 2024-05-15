<template>
  <input
    type="text"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />

  <button @click="handle">{{ props.modelValue }}</button>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['updata:modelValue'])
const handle = () => {
  emit('update:modelValue', 'sssssss')
}
</script>
