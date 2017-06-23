<template>
  <div id="app">
    <Main-header/>
    <el-row id="main-body">
      <el-col :sm="5" :md="4" :lg="3" class="side-menu-warpper">
        <Side-menu/>
      </el-col>
      <el-col :sm="19" :md="20" :lg="21" class="main-section">
        <el-row class="section">
          <el-col :span="24" class="breadcrumb">
            <Breadcrumb/>
          </el-col>
          <section class="el-col el-col-24">
            <transition name="el-fade-in" mode="out-in">
              <router-view></router-view>
            </transition>
          </section>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { MainHeader, SideMenu, Breadcrumb } from '@/components/commons'
  export default {
    name: 'Home',
    components: {
      MainHeader,
      SideMenu,
      Breadcrumb
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
        // console.log(to, from)
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
