import axios from 'axios'
import { ElMessage } from 'element-plus'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 60,
  responseType: 'json',
})

api.interceptors.request.use(
  (request) => {
    if (request.headers) {
      request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return request
  },
)

api.interceptors.response.use(
  (response) => {
    console.log('接口响应数据:', response.data)
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 1, error: '', data: '' }
     * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 error 会返回错误信息
     */
    const code = response.data.code

    if (code === 0) {
      return Promise.resolve(response.data)
    } else {
      console.log('接口返回错误:', response.data)
      ElMessage.error(response.data.msg)
      return Promise.reject(response.data)
    }
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with status code')) {
      message = error.response.data.msg
    }
    ElMessage({
      message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default api
