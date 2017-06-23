<template>
  <div id="main-header">
    <el-menu theme="dark" default-active="1" mode="horizontal">
      <li index="1" class="logo el-col el-col-24 el-col-xs-18 el-col-xs-push-3 el-col-sm-5 el-col-sm-push-0 el-col-md-4 el-col-lg-3">
        <icon name="icon-classify_icon" class="animated infinite rotateIn"></icon> {{ title }}
      </li>
      <el-menu-item index="4" class="right-block">
        <el-popover ref="userinfo" placement="bottom" :visible-arrow="false" popper-class="userinfo" width="100" trigger="hover">
          <div></div>
          <div v-text="time"></div>
          <div>
            <el-button type="text" size="" @click="logout()">
              <icon name="icon-quit_icon"></icon> 退出
            </el-button>
          </div>
        </el-popover>
        <el-button type="text" v-popover:userinfo icon="user" size="large">
          <icon name="icon-my_icon"></icon>
        </el-button>
      </el-menu-item>
      <li index="3" class="right-block">
        <el-button type="text" @click="screenfullToggle" size="large" title="">
          <transition name="fade" mode="out-in">
            <icon name="icon-amplification_icon" v-if="!isFullscreen"></icon>
            <icon name="icon-shrink_icon" v-else></icon>
          </transition>
        </el-button>
      </li>
      <li index="2">
        <el-button type="text" @click="$router.go(-1)" size="large" title="点击可后退">
          <i class="fa fa-long-arrow-left"></i>
        </el-button>
      </li>
      <li>
        <el-button type="text" @click="$router.go(1)" size="large" title="点击可前进">
          <i class="fa fa-long-arrow-right"></i>
        </el-button>
      </li>
      <li>
        <el-button type="text" @click="$router.go(0)" size="large" title="重新加载此网页">
          <icon name="icon-refresh_icon"></icon>
        </el-button>
      </li>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'MainHeader',
    data () {
      return {
        title: '管理面板',
        isFullscreen: false,
        screenfullIcon: 'icon-amplification_icon',
        time: ''
      }
    },
    created () {
      var date = new Date()
      this.time = date.toLocaleString()
    },
    watch: {
      time () {
        var that = this
        setInterval(function () {
          that.time = (new Date()).toLocaleString()
        }, 1000)
      }
    },
    methods: {
      logout () {
        this.$http.get('/general/relogin.php').then(response => {
          this.$message({
            message: '您已安全推出！',
            type: 'info'
          })
          this.$router.push('/login')
          this.$store.commit('loginOut')
        })
      },
      screenfullToggle () {
        // console.log(this.$screenfull)
        if (this.$screenfull.enabled) {
          this.$screenfull.toggle()
          this.$screenfull.onchange(() => {
            console.log(this.isFullscreen)
            this.isFullscreen = this.$screenfull.isFullscreen
          })
        } else {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '你的浏览器不支持全屏，为了得到更好的使用体验，请升级浏览器，或更换其他浏览器（Edge、Google Chrome等）'
          })
        }
      }
    }
  }
</script>
<style scoped>
  
</style>

<style>
  body .userinfo {
    min-width: 10px !important;
    border-radius: 0;
    padding: 0;
    text-align: center
  }
  
  .userinfo div {
    padding: 2px;
  }
</style>
