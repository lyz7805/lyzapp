// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import axios from 'axios'
import ElemetUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import store from './store/'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/app.css'

// es6-promise has been required in vuex
// if (!window.Promise) {
//   require('es6-promise').polyfill()
// }

axios.defaults.withCredentials = true
// Vue.use(Vuex)
Vue.use(ElemetUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
