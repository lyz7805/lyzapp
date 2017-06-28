import Vue from 'vue'
import Router from 'vue-router'

var Home = resolve => require.ensure([], () => resolve(require('@/components/Home')))
var HomeIndex = resolve => require.ensure([], () => resolve(require('@/components/Index')))
var Login = resolve => require.ensure([], () => resolve(require('@/components/login/Login')))

var Wlxx = resolve => require.ensure([], () => resolve(require('@/pages/Index')), 'wlxx')
var Wlml = resolve => require.ensure([], () => resolve(require('@/pages/wlxx/Wlml')), 'wlxx')
var Wllb = resolve => require.ensure([], () => resolve(require('@/pages/wlxx/Wllb')), 'wlxx')
var Jldw = resolve => require.ensure([], () => resolve(require('@/pages/wlxx/Jldw')), 'wlxx')

var Cpgl = resolve => require.ensure([], () => resolve(require('@/pages/Index')), 'cpgl')
var Cpxx = resolve => require.ensure([], () => resolve(require('@/pages/cpgl/Cpxx')), 'cpgl')
var Cplb = resolve => require.ensure([], () => resolve(require('@/pages/cpgl/Cplb')), 'cpgl')
var Cpxl = resolve => require.ensure([], () => resolve(require('@/pages/cpgl/Cpxl')), 'cpgl')
var Cpxlzd = resolve => require.ensure([], () => resolve(require('@/pages/cpgl/Cpxlzd')), 'cpgl')

var Scll = resolve => require.ensure([], () => resolve(require('@/pages/scll/Index')), 'scll')
var Scwlxx = resolve => require.ensure([], () => resolve(require('@/pages/scll/Wlxx')), 'scll')
var Cpqd = resolve => require.ensure([], () => resolve(require('@/pages/scll/Cpqd')), 'scll')
var Bomqd = resolve => require.ensure([], () => resolve(require('@/pages/scll/Bomqd')), 'scll')
var Scllqd = resolve => require.ensure([], () => resolve(require('@/pages/scll/Scllqd')), 'scll')

var Workflow = resolve => require.ensure([], () => resolve(require('@/pages/Index')), 'workflow')
var Flowdetpriv = resolve => require.ensure([], () => resolve(require('@/pages/workflow/Flowdetpriv')), 'workflow')

var User = resolve => require.ensure([], () => resolve(require('@/pages/Index')), 'user')
var Iconfont = resolve => require.ensure([], () => resolve(require('@/pages/user/iconfont')), 'user')

var Pdf = resolve => require.ensure([], () => resolve(require('@/components/pdfjs/Pdfjs')), 'pdf')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    iconCls: 'icon-home_icon',
    isShow: false,
    component: Home,
    redirect: '/index',
    children: [{
      path: '/index',
      name: '首 页',
      iconCls: 'icon-home_icon',
      component: HomeIndex
    }, {
      path: '/cpgl',
      name: '产品管理',
      iconCls: '',
      isShow: true,
      component: Cpgl,
      children: [{
        path: 'cpxx',
        name: '产品选型',
        iconCls: 'icon-category_find_icon',
        component: Cpxx
      }, {
        path: 'cplb',
        name: '产品类别',
        iconCls: 'icon-list_icon',
        component: Cplb
      }, {
        path: 'cpxl',
        name: '产品系列',
        iconCls: 'icon-list_icon',
        component: Cpxl
      }, {
        path: 'cplbzd',
        name: '字段管理',
        component: Cpxlzd
      }, {
        path: 'xlzd',
        name: '系列字段',
        iconCls: 'icon-more_icon',
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
      path: '/scll',
      name: '生产领料',
      iconCls: 'icon-cart_icon',
      // redirect: '/scll/index',
      component: Scll,
      children: [{
        path: 'index',
        name: '生产领料单',
        component: Scll
      }, {
        path: 'scwlxx',
        name: '生产物料信息',
        iconCls: '',
        isShow: false,
        component: Scwlxx
      }, {
        path: 'scbom',
        name: '生产BOM',
        iconCls: '',
        isShow: false,
        component: Bomqd
      }, {
        path: 'sccpqd',
        name: '产品清单',
        iconCls: '',
        isShow: false,
        component: Cpqd
      }, {
        path: 'scllqd',
        name: '生产领料清单',
        iconCls: '',
        isShow: false,
        component: Scllqd
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
      component: User,
      children: [{
        path: 'userinfo',
        name: '用户信息',
        iconCls: 'icon-my_icon',
        component: Pdf
      }, {
        path: 'iconfont',
        name: '图标',
        component: Iconfont
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
  }, {
    path: '*',
    name: '404',
    isShow: false,
    component: {
      template: '<div></div>'
    }
  }, {
    path: '/404',
    name: '404 Not Found',
    isShow: false,
    component: {
      template: '<div>404 Page</404>'
    }
  }]
})
