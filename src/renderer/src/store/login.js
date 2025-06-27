import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const token = ref(localStorage.getItem('token') || '')

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  const isLoggedIn = () => {
    return !!token.value
  }

  return {
    token,
    setToken,
    clearToken,
    isLoggedIn
  }
})