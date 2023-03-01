import { apiLogin } from '@/api'

import { Base64 } from 'js-base64'
import { defineStore } from 'pinia'
import { loginType } from './types'

export const useLoginStore = defineStore({
  id: 'login',
  state: (): loginType => ({
    token: JSON.parse(sessionStorage.getItem('token')) || '', // token
    user: JSON.parse(sessionStorage.getItem('user')) || {} // 用户信息
  }),
  getters: {
    /* 用户权限 */
    permissions: (state): string[] => {
      const arr = state.user.perms || []
      return arr.map((item) => {
        return item.authority
      })
    }
  },
  actions: {
    /* 登录 */
    doLogin(form) {
      return new Promise((resolve, reject) => {
        apiLogin(form)
          .then(({ data, headers }) => {
            this.doTokenDeal(data, headers)
            resolve(data)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    /* 企业微信扫码登录 */
    // doWwCodeLogin(form) {
    //   return new Promise((resolve, reject) => {
    //     apiWwCodeLogin(form)
    //       .then(({ data, headers }) => {
    //         this.doTokenDeal(data, headers)
    //         resolve(data)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         reject(error)
    //       })
    //   })
    // },
    /* 刷新token */
    // async doRefreshToken(form) {
    //   return new Promise((resolve, reject) => {
    //     apiRefreshToken(form)
    //       .then(({ data, headers }) => {
    //         this.doTokenDeal(data, headers)
    //         resolve(data)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         reject(error)
    //       })
    //   })
    // },
    /* 处理token */
    doTokenDeal(data, headers) {
      // console.log(data, headers, '000000000')
      if (data.code === 1020000) {
        const { authorization } = headers
        const result = authorization.slice(7).split('.')
        const base1 = Base64.decode(result[0])
        const base2 = Base64.decode(result[1])
        const token = {
          authorization: authorization,
          base1: base1,
          base2: base2
        }
        this.token = token
        if (data.content) {
          this.user = {
            ...data.content,
            ...data.content.properties
          }
          sessionStorage.setItem('user', JSON.stringify(this.user))
          localStorage.setItem('user', JSON.stringify(this.user)) // 兼容企业微信
        }
        sessionStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('token', JSON.stringify(token)) // 兼容企业微信
      }
    },
    /* 设置token */
    doSetToken() {
      if (localStorage.getItem('token') && localStorage.getItem('user')) {
        this.token = JSON.parse(localStorage.getItem('token'))
        this.user = JSON.parse(localStorage.getItem('user'))
        sessionStorage.setItem('token', JSON.stringify(this.token))
        sessionStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    /* 退出登录 */
    doLogout() {
      sessionStorage.clear()
      localStorage.clear()
      this.token = ''
      this.user = {}
    }
  }
})
