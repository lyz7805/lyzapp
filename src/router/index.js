import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import {Wlml, Wllb, Jldw} from '@/components/wlxx'
// import {Cpgl, Cpxx, Cpxl} from '@/components/cpgl'

import Wlxx from '@/components/wlxx/Index'
import Wlml from '@/components/wlxx/Wlml'
import Wllb from '@/components/wlxx/Wllb'
import Jldw from '@/components/wlxx/Jldw'
import Cpgl from '@/components/cpgl/Index'
import Cpxx from '@/components/cpgl/Cpxx'
import Cpxl from '@/components/cpgl/Cpxl'
import Workflow from '@/components/workflow/Index'
import Flowdetpriv from '@/components/workflow/Flowdetpriv.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首    页',
    iconCls: 'el-icon-menu',
    component: Home
  }, {
    path: '/cpgl',
    name: '产品管理',
    iconCls: 'el-icon-star-on',
    component: Cpgl,
    children: [{
      path: 'cpxx',
      name: '产品选型',
      iconCls: 'el-icon-document',
      component: Cpxx
    }, {
      path: 'cpxl',
      name: '产品系列',
      iconCls: 'el-icon-document',
      component: Cpxl
    }]
  }, {
    path: '/wlxx',
    name: '物料信息',
    iconCls: 'el-icon-view',
    component: Wlxx,
    children: [{
      path: 'wllb',
      name: '物料类别',
      iconCls: 'el-icon-document',
      component: Wllb
    }, {
      path: 'wlml',
      name: '物料目录',
      iconCls: 'el-icon-document',
      component: Wlml
    }, {
      path: 'jldw',
      name: '计量单位',
      iconCls: 'el-icon-document',
      component: Jldw
    }]
  }, {
    path: '/workflow',
    name: '流程管理',
    iconCls: 'el-icon-menu',
    component: Workflow,
    children: [{
      path: 'lcqx',
      name: '流程权限',
      iconCls: 'el-icon-document',
      component: Flowdetpriv
    }]
  }, {
    path: '/user',
    name: '用户管理',
    iconCls: 'el-icon-setting',
    component: Home,
    children: [{
      path: 'userinfo',
      name: '用户信息',
      iconCls: 'el-icon-document',
      component: Home
    }]
  }, {
    path: '/a',
    name: '首    页a',
    iconCls: 'el-icon-menu',
    component: Home
  }, {
    path: '/cpgla',
    name: '产品管理a',
    iconCls: 'el-icon-star-on',
    component: Cpgl,
    children: [{
      path: 'cpxxa',
      name: '产品选型a',
      iconCls: 'el-icon-document',
      component: Cpxx
    }, {
      path: 'cpxla',
      name: '产品系列a',
      iconCls: 'el-icon-document',
      component: Cpxl
    }]
  }, {
    path: '/wlxxa',
    name: '物料信息a',
    iconCls: 'el-icon-view',
    component: Wlxx,
    children: [{
      path: 'wllba',
      name: '物料类别a',
      iconCls: 'el-icon-document',
      component: Wllb
    }, {
      path: 'wlmla',
      name: '物料目录a',
      iconCls: 'el-icon-document',
      component: Wlml
    }, {
      path: 'jldwa',
      name: '计量单位a',
      iconCls: 'el-icon-document',
      component: Jldw
    }]
  }, {
    path: '/workflowa',
    name: '流程管理a',
    iconCls: 'el-icon-menu',
    component: Workflow,
    children: [{
      path: 'lcqxa',
      name: '流程权限a',
      iconCls: 'el-icon-document',
      component: Flowdetpriv
    }]
  }, {
    path: '/usera',
    name: '用户管理a',
    iconCls: 'el-icon-setting',
    component: Home,
    children: [{
      path: 'userinfo1',
      name: '用户信息b',
      iconCls: 'el-icon-document',
      component: Home
    }, {
      path: 'wllba',
      name: '物料类别b',
      iconCls: 'el-icon-document',
      component: Wllb
    }, {
      path: 'wlmla',
      name: '物料目录b',
      iconCls: 'el-icon-document',
      component: Wlml
    }, {
      path: 'jldwa',
      name: '计量单位b',
      iconCls: 'el-icon-document',
      component: Jldw
    }]
  }]
})
