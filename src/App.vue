<template>
  <div id="app">
    <transition name="el-fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
      }
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
