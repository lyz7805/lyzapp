import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

var proxyServer = 'http://localhost'
var apiPath = 'lyzapp/api/'

var apis = {
  login: {
    path: '',
    api: {
      isLogin: 'isLogin.php'
    }
  },
  cpgl: {
    path: 'cpgl',
    api: {
      cplb: 'cplb.php',
      cpxl: 'cpxl.php'
    }
  }
}
