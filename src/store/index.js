import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// var store = new Vuex.Store({
//   state: {
//     isLogin: false
//   },
//   mutations: {
//     loginIn (state) {
//       state.isLogin = true
//     },
//     loginOut (state) {
//       state.isLogin = false
//     }
//   }
// })

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    loginIn (state) {
      state.isLogin = true
    },
    loginOut (state) {
      state.isLogin = false
    }
  }
})
