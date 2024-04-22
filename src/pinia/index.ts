import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userRole = defineStore('role', () => {
    const roles = ref('rong')
    const updataRole = (val) => {
        roles.value += val
    }
    return {
        roles,
        updataRole
    }
})