<template>
  <div id="app">
    <template v-if=" !isLogin">
      <router-view></router-view>
    </template>
    <template v-else>
      <main-header></main-header>
      <el-row id="main-body">
        <el-col :sm="5" :md="4" :lg="3" class="aside-menu-warpper">
          <aside-menu></aside-menu>
        </el-col>
        <el-col :sm="19" :md="20" :lg="21" class="main-section">
          <el-card class="section">
            <div slot="header">
              <breadcrumb></breadcrumb>
            </div>
            <section>
              <router-view></router-view>
            </section>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import MainHeader from './components/commons/Header'
  import AsideMenu from './components/commons/Asidemenu'
  import Breadcrumb from './components/commons/Breadcrumb'
  export default {
    name: 'app',
    data () {
      return {
        isLogin: false
      }
    },
    created () {
      var url = '/lyzapp/api/isLogin.php'
      axios.get(url).then(response => {
        if (response.data === true) {
          this.isLogin = true
        } else {
          this.$router.push('/login')
        }
      })
    },
    components: {
      'main-header': MainHeader,
      'aside-menu': AsideMenu,
      breadcrumb: Breadcrumb
    }
  }

</script>
