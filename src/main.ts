import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
// import '@/assets/iconfont/iconfont' // 阿里矢量图标
// import '@/styles/index.scss' // 全局样式
// import '@vant/touch-emulator' // 企业微信下拉滚动问题

import { loadAllPlugins } from '@/plugins'

const app = createApp(App)
/* 加载所有插件 */
loadAllPlugins(app)

app.use(router)
app.mount('#app')
