import { defineStore } from 'pinia'

export const useWxLoginStore = defineStore({
  id: 'wxLogin',
  state: () => ({
    wxFriendUserId: sessionStorage.getItem('wxFriendUserId') || process.env.VUE_APP_WX_FRIEND_USER_ID // 企业微信好友id
  }),
  actions: {
    /* 获取企业微信好友id */
    doWxFriendUserId(usrId) {
      this.wxFriendUserId = usrId
      sessionStorage.setItem('wxFriendUserId', usrId)
    }
  }
})
