<template>
  <div id="login" v-if="!wwCode">
    <div style="display: flex; align-items: center; height: 75%">
      <div class="login-center">
        <div class="login_title">
          <!--          <img src="../../assets/signIn/logo.png" alt="" height="50" style="margin-bottom: 20px" />-->
          <div class="title">金财CRM呼叫中心</div>
        </div>
        <div class="login-border">
          <van-cell-group>
            <van-field
              left-icon="manager-o"
              v-model.trim="ruleForm.newUsername"
              type="text"
              placeholder="请输入账号"
              width="100%"
            />
            <van-field
              left-icon="eye-o"
              v-model.trim="ruleForm.newPassword"
              type="password"
              placeholder="请输入密码"
              width="100%"
            >
              <template #button>
                <span class="forgetText" @click="onForgetPassword">忘记密码?</span>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="Codecheckbox">
          <van-field>
            <template #input>
              <van-checkbox v-model="checked" shape="square" icon-size="16px">记住我</van-checkbox>
            </template>
          </van-field>
        </div>
        <van-button class="wwCodeButton" @click="checkLogin" color="#409EFF" size="middle">登录</van-button>
        <div class="wwCodeLogin" @click="onAndroidWwCode">
          <svg class="icon" aria-hidden="true" style="margin-right: 0.1rem; font-size: 0.35rem">
            <use xlink:href="#icon-qiyeweixin"></use>
          </svg>
          企业微信跳转登录
        </div>
        <div class="wwCodeLogin" @click="onAndroidWwCodeNew">
          <svg class="icon" aria-hidden="true" style="margin-right: 0.1rem; font-size: 0.4rem">
            <use xlink:href="#icon-saoma"></use>
          </svg>
          企业微信扫码登录
        </div>
      </div>
    </div>
    <div class="bottomTips">
      <a href="https://beian.miit.gov.cn/" target="_blank" style="color: #ccc">网站备案：京ICP备15064845号-1</a>
    </div>
  </div>
  <ww-code-login @onCloseWwCode="onCloseWwCode" v-else></ww-code-login>
</template>

<script>
import md5 from 'js-md5'
import { mapState, mapActions } from 'pinia'
import { useLoginStore } from '@/store/login'
// import { Toast, MessageBox } from 'mint-ui'
import { Toast, Dialog } from 'vant'
import { apiForgetPassword } from '@/api'
import { getIsWxWork } from '@/utils/wwconfig'
import wwCodeLogin from '@/components/wwCodeLogin/wwCodeLogin.vue'
export default {
  name: 'login',
  components: {
    'ww-code-login': wwCodeLogin
  },
  data() {
    return {
      ruleForm: {
        newUsername: '', // 用户名
        newPassword: '', // 密码
        Tel1: ''
        // newUsername: '',// 用户名
        // newPassword: '',// 密码
      },
      checked: false, // 是否记住密码
      wwCode: false
    }
  },
  computed: {
    ...mapState(useLoginStore, ['token'])
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.query.code) {
          this.onWwCodeLogin(val.query)
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    window.getLoginQwCode = this.getLoginQwCode
  },
  mounted() {
    // 判断当前页面的运行环境（微信）
    // const ua = navigator.userAgent.toLowerCase()
    /* console.log(ua)
    console.log(ua.match(/MicroMessenger/i))
    console.log('micromessenger')
    console.log(ua.match(/MicroMessenger/i).includes('micromessenger')) */
    // if (getIsWxWork()) {
    //   // 判断是否企业微信
    //   this.$router.push('/wxLogin')
    // } else
    if (getIsWxWork()) {
      // console.log(this.$route)
      if (this.$route.query.isWorkbench) {
        localStorage.clear()
        sessionStorage.setItem('isWorkbench', JSON.stringify(true))
        console.log(JSON.parse(sessionStorage.getItem('isWorkbench')))
        this.$router.push('/wxLogin')
      } else {
        this.doSetToken()
        if (this.onCheckToken()) {
          // this.$router.push('/home/studyGroup')
          sessionStorage.setItem('isWorkbench', JSON.stringify(true))
          this.$router.push('/home/sceneService')
        }
      }
      // 企业微信工作台
    } else if (this.android || /MicroMessenger/i.test(navigator.userAgent)) {
      // 安卓环境 或 微信公众号 直接登录
      this.doSetToken()
      if (this.onCheckToken()) {
        this.$router.push('/home/studyGroup')
      }
    }
    // if (localStorage.getItem('login')) {
    //   this.ruleForm = JSON.parse(localStorage.getItem('login'))
    //   // this.checked = true
    // }
  },
  methods: {
    ...mapActions(useLoginStore, ['doLogin', 'doWwCodeLogin', 'doSetToken']),
    /* 忘记密码 */
    async onForgetPassword() {
      const { newUsername } = this.ruleForm
      const regex = /^jc/
      if (!regex.test(newUsername)) {
        Toast({
          message: '请输入正确crm账号',
          position: 'top',
          duration: 2000
        })
        return
      }

      try {
        await Dialog.confirm({ message: '新密码将发送到该账号绑定的手机' })
        const { data } = await apiForgetPassword(this.ruleForm.newUsername)
        if (data.code === 1020000) {
          Toast({
            message: '新密码已发送到手机上',
            position: 'top',
            duration: 2000
          })
        } else {
          Toast({
            message: '该用户不存在',
            position: 'top',
            duration: 2000
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    /* 登录 */
    checkLogin() {
      /* 登录处理 */
      const { newUsername, newPassword } = this.ruleForm
      const regex = /^jc|ls/
      if (!regex.test(newUsername)) {
        Toast({
          message: '请输入正确crm账号',
          position: 'top',
          duration: 2000
        })
        return
      }
      const regex2 = /^[a-z0-9-]*$/
      if (!regex2.test(newUsername)) {
        Toast({
          message: '帐号有误，若帐号中带有 . 需要自行替换成 -',
          position: 'top',
          duration: 2000
        })
        return
      }
      const _form = {
        username: newUsername.replace(/\s*/g, ''),
        password: md5(newPassword)
      }
      const p = this.doLogin(_form)
      /* 成功 */
      p.then((data) => {
        if (data.code === 1020000) {
          const properties = data.content.properties
          // console.log(this.android, properties.mobile !== this.getTel())
          // if (this.android && !this.android.getLocalPhoneNum) {
          //   MessageBox.alert('检测到新版本，请关闭后重新打开App！').then(action => {})
          //   return
          // } else if (this.android && properties.mobile !== this.getTel() && properties.mobile2 !== this.getTel() && properties.mobile3 !== this.getTel()) { // 判断安卓环境
          //   MessageBox.alert('手机号与账号不一致!').then(action => {
          //     this.delTel()
          //   })
          //   return
          // }
          /* 判断是否保存密码 */
          if (this.checked) {
            localStorage.setItem('login', JSON.stringify(this.ruleForm))
          }
          if (this.android && !this.android.getLocalPhoneNum) {
            Dialog.alert({
              message: '检测到新版本，请关闭后重新打开App！'
            }).then((action) => {
              this.delTel()
            })
            return
          } else if (this.android && !properties.mobile.includes(this.getTel())) {
            // 判断安卓环境
            Dialog.alert({ message: '手机号与账号不一致!' }).then((action) => {
              localStorage.clear()
              this.delTel()
            })
            return
          }
          if (getIsWxWork()) {
            sessionStorage.setItem('isWorkbench', JSON.stringify(true))
            this.$router.push('/home/sceneService')
          } else {
            this.$router.push('/home/studyGroup')
          }
          console.log('%c我是登录', 'color: green;')
          Toast({ message: '登录成功', position: 'top', duration: 2000 })
        } else {
          Toast({ message: data.message, position: 'top', duration: 2000 })
        }
      })
      /* 失败 */
      p.catch((error) => {
        console.log(error)
        console.log('%c服务器错误', 'color: red;')
      })
    },
    /* app检查token是否有效 */
    onCheckToken() {
      let tokenState = false // token是否有效
      const nowTime = Number(new Date().getTime())

      if (this.token) {
        // 判断token是否有效
        const token = this.token
        const tokenTime = Number(JSON.parse(token.base2).exp.toString() + '000')
        tokenState = tokenTime - nowTime > 0
      }

      return tokenState
    },
    getTel() {
      try {
        console.log('获取手机号')
        return this.android.getLocalPhoneNum()
      } catch (e) {
        console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
      }
    },
    delTel() {
      try {
        console.log('删除手机号')
        this.android.cleanLocalPhoneNum()
      } catch (e) {
        console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
      }
    },
    onCloseWwCode() {
      this.wwCode = false
    },
    onWwCodeLogin(form) {
      const p = this.doWwCodeLogin(form)
      /* 成功 */
      p.then((data) => {
        if (data.code === 1020000) {
          const properties = data.content.properties
          if (this.android && !this.android.getLocalPhoneNum) {
            Dialog.alert({
              message: '检测到新版本，请关闭后重新打开App！'
            }).then((action) => {})
            return
          } else if (this.android && !properties.mobile.includes(this.getTel())) {
            // 判断安卓环境
            Dialog.alert({ message: '手机号与账号不一致!' }).then((action) => {
              this.delTel()
            })
            return
          }
          console.log(111)
          this.$router.push('/home/studyGroup')
          Toast({ message: '登录成功', position: 'top', duration: 2000 })
        } else {
          Toast({ message: data.message, position: 'top', duration: 2000 })
        }
      })
      /* 失败 */
      p.catch((error) => {
        console.log(error)
        console.log('%c服务器错误', 'color: red;')
      })
    },
    onAndroidWwCode() {
      if (this.android) {
        this.android.qwLogin()
        return
        // Toast({ message: 'android获取code:::::' + this.android.qwLogin(), position: 'top', duration: 2000 })
      }
      Toast({
        message: '企业微信跳转登录仅支持安卓APP使用',
        position: 'top',
        duration: 2000
      })
    },
    onAndroidWwCodeNew() {
      this.wwCode = true
    },
    getLoginQwCode(code) {
      this.onWwCodeLogin({ code: code })
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  height: 1;
  flex-direction: column;
  display: flex;
  align-items: center;


  .login-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    text-align: center;
    flex-wrap: wrap;

    .login_title {
      margin: 0 auto 1rem;
      width: 100%;
      font-size: 0.4rem;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      font-style: normal;
    }

    :deep([class*='van-hairline']::after) {
      border: none;
    }

    :deep(.van-field__control--custom) {
      justify-content: flex-end;
    }

    .login-border {
      padding: 0 0.2rem;
      width: 75%;
      border: 0.01rem solid #eee;
      border-radius: 0.1rem;

      :deep(.van-field__control) {
        padding: 0 0.2rem;
      }
    }

    .Codecheckbox {
      width: 75%;
    }

    .wwCodeButton {
      margin-top: 0.2rem;
      width: 70%;
      height: 0.75rem;
      font-size: 0.28rem;
      border-radius: 0.1rem;
    }

    .wwCodeLogin {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.45rem;
      width: 100%;
      font-size: 0.28rem;
      color: #399cff;
    }
  }

  .bottomTips {
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    font-size: 0.26rem;
    text-align: center;
    color: #ccc;
  }
}
</style>
