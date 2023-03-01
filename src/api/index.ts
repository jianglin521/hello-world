/* Created by guan on 2018/12/19 */

import axios from '@/utils/request'

export const baseImg =
  window.location.hostname === 'app.icfo.cn' ? 'http://img.icfo.cn' : 'http://crmimgtest.jincaixueshe.com'

/* 登录接口 */
export function apiLogin(form) {
  const api = form.type ? '/wxchat/login' : '/login'
  return axios.post(api, form, {
    params: {
      ...form
    },
    headers: {
      Client: 'app'
    }
  })
}
