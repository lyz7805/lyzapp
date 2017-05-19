import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Index'
import Login from '@/components/login/Login'
import Wlxx from '@/components/wlxx/Index'
import Wlml from '@/components/wlxx/Wlml'
import Wllb from '@/components/wlxx/Wllb'
import Jldw from '@/components/wlxx/Jldw'
import Cpgl from '@/components/cpgl/Index'
import Cpxx from '@/components/cpgl/Cpxx'
import Cplb from '@/components/cpgl/Cplb'
import Cpxl from '@/components/cpgl/Cpxl'
import Cpxlzd from '@/components/cpgl/Cpxlzd'
import Workflow from '@/components/workflow/Index'
import Flowdetpriv from '@/components/workflow/Flowdetpriv.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首 页',
    iconCls: 'fa fa-home',
    isShow: true,
    component: Home
  }, {
    path: '/cpgl',
    name: '产品管理',
    iconCls: 'fa fa-product-hunt',
    isShow: true,
    component: Cpgl,
    // component: function (resolve) {
    //   require(['@/components/cpgl/Index'], resolve)
    // },
    children: [{
      path: 'cpxx',
      name: '产品选型',
      iconCls: 'fa fa-file-o',
      isShow: true,
      component: Cpxx
    }, {
      path: 'cplb',
      name: '产品类别',
      isShow: true,
      component: Cplb
    }, {
      path: 'cpxl',
      name: '产品系列',
      isShow: true,
      component: Cpxl
    }, {
      path: 'cpxlzd',
      name: '产品系列字段',
      isShow: true,
      component: Cpxlzd
    }]
  }, {
    path: '/wlxx',
    name: '物料信息',
    iconCls: 'fa fa-list',
    component: Wlxx,
    children: [{
      path: 'wllb',
      name: '物料类别',
      component: Wllb
    }, {
      path: 'wlml',
      name: '物料目录',
      component: Wlml
    }, {
      path: 'jldw',
      name: '计量单位',
      component: Jldw
    }]
  }, {
    path: '/workflow',
    name: '流程管理',
    iconCls: 'fa fa-file-text',
    component: Workflow,
    children: [{
      path: 'lcqx',
      name: '流程权限',
      iconCls: '',
      component: Flowdetpriv
    }]
  }, {
    path: '/user',
    name: '用户管理',
    iconCls: 'fa fa-user',
    component: Home,
    children: [{
      path: 'userinfo',
      name: '用户信息',
      component: Home
    }, {
      path: 'userinfo1',
      name: '用户信息b',
      component: Home
    }, {
      path: 'wllba',
      name: '物料类别b',
      component: Wllb
    }, {
      path: 'wlmla',
      name: '物料目录b',
      component: Wlml
    }, {
      path: 'jldwa',
      name: '计量单位b',
      component: Jldw
    }]
  }, {
    path: '/login',
    name: '登 录',
    iconCls: 'fa fa-sign-in',
    isShow: false,
    component: Login
  }]
})
