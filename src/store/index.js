import Vue from 'vue'
import Vuex from 'vuex'

if (!window.Promise) {
  require('es6-promise').polyfill()
}
Vue.use(Vuex)

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
