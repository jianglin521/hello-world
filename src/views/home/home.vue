<template>
  <!-- home -->
  <el-container style="height: 100%">
    <!-- 左侧 -->
    <el-aside width="206px" style="overflow-x: hidden; background: #272b2e">
      <component :is="currentRole" />
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <el-header style="height: 70px">
        <my-header />
      </el-header>

      <!-- 内容区 -->
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { apiLogin } from '@/api/login'
import myHeader from '@/components/home/header' // 头部
import crmSide from '../../components/home/crmSide'

export default {
  name: 'home',
  components: {
    myHeader,
    crmSide
  },
  computed: {
    ...mapGetters(['permissions']),
    ...mapState('header', ['pattern']),
    currentRole() {
      return crmSide
    }
  },
  methods: {
    async test() {
      const { data } = await apiLogin({
        username: 'jc.zongbu.guanli',
        password: '0e6261b081b098bfbcdb470a60874a69'
      })
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  background: white;
}
</style>
<style>
aside::-webkit-scrollbar {
  /* 滚动条整体样式 */
  width: 6px; /* 高宽分别对应横竖滚动条的尺寸 */
  height: 1px;
}

aside::-webkit-scrollbar-thumb {
  /* 滚动条里面小方块 */
  border-radius: 3px;
  background: #c0c4cc;
  box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
}

aside::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #ededed;

  /* 滚动条里面轨道 */
  box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
}
</style>
