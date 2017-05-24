// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElemetUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/app.css'

if (!window.Promise) {
  require('es6-promise/auto')
}
// require('es6-promise').polyfill()
Vue.prototype.$http = axios
Vue.use(ElemetUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
