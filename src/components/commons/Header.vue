<template>
  <div id="main-header">
    <el-menu theme="dark" default-active="1" mode="horizontal" @select="">
      <el-col :xs="{span:18, push:3}" :sm="{span:5, push:0}" :md="4" :lg="3" class="logo">
        <icon name="icon-classify_icon" class="animated infinite rotateIn"></icon> {{ title }}
      </el-col>
      <el-col :xs="{span:3}" :sm="{span:4, push:15}" :md="{span:4, push:16}" :lg="{span:4, push:17}">
        <el-menu-item index="3" class="right-block">
          <el-popover ref="userinfo" placement="bottom" :visible-arrow="false" popper-class="userinfo" width="100" trigger="hover">
            <div></div>
            <div v-text="time"></div>
            <div>
              <el-button type="text" size="" @click="loginOut()">
                <i class="fa fa-sign-out"></i> 退出
              </el-button>
            </div>
          </el-popover>
          {{ time }}
          <el-button type="text" v-popover:userinfo icon="user" size="large">
            <icon name="icon-my_icon"></icon>
          </el-button>
        </el-menu-item>
      </el-col>
      <el-col :xs="24" :sm="{span:15, pull:4}" :md="{span:16, pull:4}" :lg="{span:17, pull:4}">
        <el-menu-item index="2">
          <el-button type="text" @click="$router.go(-1)" size="small" title="点击可后退">
            <i class="fa fa-long-arrow-left"></i>
          </el-button>
          <el-button type="text" @click="$router.go(1)" size="small" title="点击可前进">
            <i class="fa fa-long-arrow-right"></i>
          </el-button>
          <el-button type="text" @click="$router.go(0)" size="small" title="重新加载此网页">
            <icon name="icon-refresh_icon"></icon>
          </el-button>
        </el-menu-item>
      </el-col>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'header',
    data () {
      return {
        title: '管理面板',
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
      loginOut () {
        this.$http.get('/general/relogin.php').then(response => {
          this.$message({
            message: '您已安全推出！',
            type: 'info'
          })
          this.$router.push('/login')
          this.$store.commit('loginOut')
        })
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
