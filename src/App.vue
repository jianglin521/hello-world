<template>
  <router-view />
</template>

<script>
import { mapActions } from 'pinia'
import { useLoginStore } from '@/store/login'
export default {
  name: 'App',
  data() {
    return {}
  },
  mounted() {
    this.isToken()
  },
  methods: {
    ...mapActions(useLoginStore, ['doRefreshToken']),
    // 判断是否过期
    isToken() {
      let timer = ''
      clearInterval(timer) // 清除定时器
      timer = setInterval(async () => {
        if (window.sessionStorage.getItem('token')) {
          const token = JSON.parse(window.sessionStorage.getItem('token'))
          const data1 = JSON.parse(token.base2).exp.toString() + '000'
          const data2 = new Date().getTime().toString() * 1
          const data3 = data1 - data2
          if (data3 <= 1000 * 60 * 8) {
            console.log(data3 / 1000 / 60)
            const data = await this.doRefreshToken({ pattern: 0 })
            if (data.code === 1020000) {
              console.log('获取token')
            } else {
              // this.$store.dispatch('doLogout')
              this.$router.push('/login')
            }
          }
        }
      }, 1000 * 60)
    }
  }
}
</script>
