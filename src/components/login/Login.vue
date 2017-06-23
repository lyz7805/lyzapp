<template>
  <el-row id="login">
    <el-form ref="login_form" class="login_form animated zoomIn" name="login_form" label-width="0" label-position="left">
      <img src="/static/images/logo.png" class="logo animated">
      <el-form-item class="input-wrap">
        <icon name="icon-my_icon" class="animated"></icon>
        <el-input type="text" size="small" id="name" name="UNAME" :maxlength="20" auto-complete v-model="uname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="input-wrap">
        <icon name="icon-password_icon" class="animated"></icon>
        <el-input type="password" size="small" id="password" name="PASSWORD" auto-complete v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="display:none;">
        <el-input type="hidden" name="encode_type" v-model="encode_type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" id="submit" class="login_btn" @click="login">登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        uname: '',
        password: '',
        encode_type: 1
      }
    },
    beforeCreate () {
      if (this.$store.state.isLogin === true) {
        this.$router.push('/')
      }
    },
    mounted () {
      this.uname = this.$cookies.get('USER_NAME_COOKIE')
    },
    computed: {
      base64Pwd () {
        var base64Pwd = this.password
        if (this.encode_type === 1 && base64Pwd !== '') {
          base64Pwd = window.btoa(base64Pwd)
        }
        return base64Pwd
      }
    },
    methods: {
      login () {
        var logining = this.$loading({
          target: '#login>form',
          lock: true,
          text: '登录中...',
          customClass: 'logining'
        })
        console.log(logining)
        this.$http.get('/logincheck.php', {
          params: {
            UNAME: this.uname,
            PASSWORD: this.base64Pwd,
            encode_type: this.encode_type
          }
        }).then(() => {
          setTimeout(() => {
            this.$http.get('/lyzapp/api/isLogin.php').then(res => {
              console.log(res)
              if (res.data === true) {
                this.$router.push('/')
              } else {
                this.$message({
                  type: 'warning',
                  message: '密码错误，请重新登录'
                })
              }
              logining.close()
            })
          }, 1000)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #login {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: url(/static/images/login_bg.jpg) no-repeat;
    background-size: 100% 100%;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    text-align: center
  }
  
  #login .login_form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    position: absolute;
    margin-top: -250px;
    margin-left: -250px;
  }
  
  #login .logo {
    margin: 10px auto
  }
  
  #login .logo:hover {
    -webkit-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation-name: swing;
    animation-name: swing;
  }
  
  #login .input-wrap {
    width: 300px;
    margin: 24px auto;
  }
  
  #login .input-wrap .el-form-item__content {
    margin-left: 0px;
    /*border: 1px solid #ccc;*/
    /*border-radius: 3px;*/
    /*background: transparent;*/
    /*box-sizing: content-box;*/
    vertical-align: middle;
  }
  
  #login .input-wrap .el-form-item__content:hover svg.icon {
    -webkit-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation-name: swing;
    animation-name: swing;
  }
  
  #login .input-wrap .el-form-item__content svg.icon {
    width: 36px;
    height: 18px;
    vertical-align: middle;
    color: #2196f3
  }
  
  #login .input-wrap .el-form-item__content .el-input {
    width: 254px
  }
  
  #login .input-wrap .el-form-item__content .el-input input {
    background: transparent
  }
  
  .login_btn {
    width: 300px
  }
  
  .logining {
    background-color: rgba(255, 255, 255, .5);
    border-radius: 50%
  }
</style>
