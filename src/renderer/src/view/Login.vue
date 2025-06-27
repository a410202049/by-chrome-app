<template>
  <div class="login-container">
    <div id="mybgdiy" class="vanta-background"></div>
    <div class="login-box">
      <h2>登录</h2>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/login'
import api from '@/utils/apiRequest'
import { ElMessage } from 'element-plus'
import { AestheticFluidBg } from "@/utils/AestheticFluidBg.module.js";

const router = useRouter()
const loginStore = useLoginStore()
const loginForm = ref(null)
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const handleLogin = async () => {
  if (loading.value) return
  loading.value = true
  if (!loginForm.value) return
  await loginForm.value.validate(async (valid) => {
    if (valid) {
        try {
          const res = await api.post('/login', form)
          loginStore.setToken(res.data.token)
          ElMessage.success('登录成功')
          router.push('/')
        } catch (error) {
          ElMessage.error('登录失败')
        } finally {
          loading.value = false
        }
    } else {
      loading.value = false
    }
  })
}

onMounted(() => {
  let colorbg = new AestheticFluidBg({
    dom: "mybgdiy",
    colors: ["#f5f8ff", "#f5f8ff", "#b8d7ff", "#66bdff", "#d6e5fd", "#d3e4ff"],
    loop: true
  });
});
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 确保背景在底层 */
}

.login-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
}
</style>