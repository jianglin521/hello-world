/* Created by guan on 2019/5/5 */
import axios from 'axios'
import { useLoginStore } from '@/store/login'

/* 创建axios实例 */
const service = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  timeout: 60 * 1000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

/* 请求添加token */
service.interceptors.request.use(
  (config) => {
    // 检查token是否过期
    const loginStore = useLoginStore()
    const { authorization } = loginStore.token
    if (authorization) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/* 全局错误处理 */
service.interceptors.response.use(
  (response) => {
    const data = response.data
    const codeList = [1020000, 1040400, 1040400, 1000001]
    if (codeList.includes(data.code) || !data.code) {
      return response
    } else if (data.code === 1000409) {
      // 企业微信处理未绑定
      const loginStore = useLoginStore()
      loginStore.doLogout() // 退出登录
      window.location.href = '/wxLogin'
    } else {
      return response
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
