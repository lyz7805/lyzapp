import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Index'
import Login from '@/pages/login/Login'
import Wlxx from '@/pages/wlxx/Index'
import Wlml from '@/pages/wlxx/Wlml'
import Wllb from '@/pages/wlxx/Wllb'
import Jldw from '@/pages/wlxx/Jldw'
import Cpgl from '@/pages/cpgl/Index'
import Cpxx from '@/pages/cpgl/Cpxx'
import Cplb from '@/pages/cpgl/Cplb'
import Cpxl from '@/pages/cpgl/Cpxl'
import Cpxlzd from '@/pages/cpgl/Cpxlzd'
import Workflow from '@/pages/workflow/Index'
import Flowdetpriv from '@/pages/workflow/Flowdetpriv.vue'
// import Pdf from '@/components/pdfjs/web/viewer.vue'
import Pdf from '@/components/pdfjs/Pdfjs.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首 页',
    iconCls: 'icon-home_icon',
    isShow: true,
    component: Home
  }, {
    path: '/cpgl',
    name: '产品管理',
    iconCls: '',
    isShow: true,
    component: Cpgl,
    // component: function (resolve) {
    //   require(['@/components/cpgl/Index'], resolve)
    // },
    children: [{
      path: 'cpxx',
      name: '产品选型',
      iconCls: 'icon-category_find_icon',
      isShow: true,
      component: Cpxx
    }, {
      path: 'cplb',
      name: '产品类别',
      iconCls: 'icon-list_icon',
      isShow: true,
      component: Cplb
    }, {
      path: 'cpxl',
      name: '产品系列',
      iconCls: 'icon-list_icon',
      isShow: true,
      component: Cpxl
    }, {
      path: 'cplbzd',
      name: '字段管理',
      isShow: true,
      component: Cpxlzd
    }, {
      path: 'xlzd',
      name: '系列字段',
      iconCls: 'icon-more_icon',
      isShow: true,
      component: Cpxl
    }]
  }, {
    path: '/wlxx',
    name: '物料信息',
    iconCls: 'icon-account_book_icon',
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
    iconCls: 'icon-organization_icon',
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
    iconCls: 'icon-account',
    component: Cpgl,
    children: [{
      path: 'userinfo',
      name: '用户信息',
      iconCls: 'icon-my_icon',
      component: Pdf
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
    isShow: false,
    component: Login
  }, {
    path: '/pdf',
    name: 'PDF',
    isShow: false,
    component: Pdf
  }]
})
