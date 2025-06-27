<template>
  <div id="app">
    <router-view v-if="!isAuthenticated" />
    <main-view v-else></main-view>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/login'
import MainView from '@/view/main.vue'

const router = useRouter()
const loginStore = useLoginStore()

// 调用 isLoggedIn 方法时加上括号
const isAuthenticated = computed(() => {
  return loginStore.isLoggedIn()
})

// 使用 watch 响应式监听登录状态变化
watch(isAuthenticated, (newValue) => {
  if (!newValue) {
    router.push('/login')
  }
}, { immediate: true })

const handleLogout = () => {
  loginStore.clearToken()
  router.push('/login')
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.login-status {
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 20px;
}
</style>
