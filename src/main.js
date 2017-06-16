// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import axios from 'axios'
import screenfull from 'screenfull'
import ElemetUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store/'
import router from './router'
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/app.css'
import '../static/iconfont.js'
import Icon from '@/components/Icon'
import App from './App'

// es6-promise has been required in vuex
// if (!window.Promise) {
//   require('es6-promise').polyfill()
// }

Vue.component('icon', Icon)
axios.defaults.withCredentials = true
// Vue.use(Vuex)
Vue.use(ElemetUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$screenfull = screenfull

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  created () {
    console.log(this)
  }
})
