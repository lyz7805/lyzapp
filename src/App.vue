<template>
  <div id="app">
    <main-header></main-header>
    <el-row id="main-body">
      <el-col :sm="5" :md="4" :lg="3" class="aside-menu-warpper">
        <aside-menu></aside-menu>
      </el-col>
      <el-col :sm="19" :md="20" :lg="21" class="main-section">
        <!--<div class="el-card__header">
                          <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :to="item.path">{{ item.title }}</el-breadcrumb-item>
                          </el-breadcrumb>
                        </div>-->
        <el-card class="section">
          <div slot="header" class="">
            <breadcrumb></breadcrumb>
          </div>
          <section>
            <router-view></router-view>
          </section>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MainHeader from './components/Header'
import AsideMenu from './components/Asidemenu'
import Breadcrumb from './components/Breadcrumb'
export default {
  name: 'app',
  // template: '<aside-menu/>',
  components: {
    'main-header': MainHeader,
    'aside-menu': AsideMenu,
    breadcrumb: Breadcrumb
  },
  data () {
    return {

    }
  },
  methods: {
    handleSelect (index, indexPath) {

    }
  }
}

</script>

<style>
html,
body {
  margin: 0;
}

.left-block {
  display: block;
  float: left !important;
}

.right-block {
  display: block;
  float: right !important;
}

#main-body .aside-menu-warpper,
#main-body .main-section,
#main-body .main-section .section {
  height: 100%
}

#main-body .main-section .section .el-card__body {
  height: 85%;
  overflow: auto
}





/*#main-body .main-section .el-card iframe {
    min-height: 650px;
    width: 100%;
    border: 0
  }*/

@media screen and (min-width: 768px) {
  #main-body {
    position: absolute;
    height: 92%;
    width: 100%
  }

  /*.aside-menu-warpper {
    position: fixed
  }*/
  #main-body .main-section {
    position: absolute;
    right: 0;
  }
}
</style>
