import { defineStore } from 'pinia'
import { useLoginStore } from '@/store/login'
// import { apiAllProvince, apiCustomersTag } from '@/api'

export const usePhoneBookStore = defineStore({
  id: 'phoneBook',
  state: () => ({
    customersTag: {},
    provinceAll: [] // 省份数据列表
  }),
  getters: {
    provinceAllList: (state) => {
      // 省级数据格式转换
      const _arr = []
      if (state.provinceAll.length > 0) {
        state.provinceAll.map((item) => {
          _arr.push({ text: item.name, value: item.id })
        })
      }
      return _arr
    }
  },
  actions: {
    /* 查询客户标签 */
    // doCustomersTag() {
    //   return new Promise((resolve, reject) => {
    //     apiCustomersTag()
    //       .then(({ data }) => {
    //         if (data.code === 1020000 || data.code === 10404000) {
    //           this.customersTag = data.content
    //         }
    //         resolve(data)
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         reject(error)
    //       })
    //   })
    // },
    /* 获取所有省份数据 */
    // doFindProvince() {
    //   return new Promise((resolve, reject) => {
    //     apiAllProvince()
    //       .then(({ data }) => {
    //         this.provinceAll = data.content
    //         sessionStorage.setItem('provinceAll', JSON.stringify(data.content))
    //         resolve(data)
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // }
  }
})
