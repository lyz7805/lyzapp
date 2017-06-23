<template>
  <div id="app">
    <template v-if=" !$store.state.isLogin">
      <router-view></router-view>
    </template>
    <template v-else>
      <template v-if="$route.path == '/pdf'">
        <router-view></router-view>
      </template>
      <template v-else>
        <main-header></main-header>
        <el-row id="main-body">
          <el-col :sm="5" :md="4" :lg="3" class="aside-menu-warpper">
            <aside-menu></aside-menu>
          </el-col>
          <el-col :sm="19" :md="20" :lg="21" class="main-section">
            <el-row class="section">
              <el-col :span="24" class="breadcrumb">
                <breadcrumb></breadcrumb>
              </el-col>
              <section class="el-col el-col-24">
                <router-view></router-view>
              </section>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </template>
  </div>
</template>

<script>
  import MainHeader from './components/commons/Header'
  import AsideMenu from './components/commons/Asidemenu'
  import Breadcrumb from './components/commons/Breadcrumb'
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    components: {
      'main-header': MainHeader,
      'aside-menu': AsideMenu,
      breadcrumb: Breadcrumb
    },
    created () {
      var url = '/lyzapp/api/isLogin.php'
      this.$http.get(url).then(response => {
        if (response.data === true) {
          this.$store.commit('loginIn')
          this.$message({
            message: '欢迎回来！',
            type: 'success',
            duration: 1500
          })
        } else {
          this.$router.push('/login')
        }
      }).catch(() => {
        this.$router.push('/login')
      })
    },
    watch: {
      '$route' (to, from) {
        console.log(to, from)
        if (this.$store.state.isLogin === false && to.path === '/login') {
          this.$message({
            message: '您还未登录，请先登录...',
            type: 'warning'
          })
        }
        if (this.$store.state.isLogin === true && from.path === '/login') {
          this.$message({
            message: '登录成功，欢迎回来！',
            type: 'success',
            duration: 1500
          })
        }
        if (this.$route.path === '/login' && this.$store.state.isLogin === true) {
          this.$router.push('/')
        }
      }
    },
    mounted () {
      // console.log(document.cookie)
      // console.log(this.$store)
    }
  }
</script>
