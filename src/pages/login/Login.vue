<template>
  <el-row id="login">
    <el-form ref="login_form" class="login_form animated zoomIn" name="form1" method="post" label-width="0" label-position="left" autocomplete="on">
      <img src="/static/images/logo.png" class="logo animated tada">
      <el-form-item class="input-wrap">
        <icon name="icon-my_icon" class="animated"></icon>
        <el-input type="text" size="small" id="name" name="UNAME" :maxlength="20" auto-complete autofocus v-model="uname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="input-wrap">
        <icon name="icon-password_icon" class="animated"></icon>
        <el-input type="password" size="small" id="password" name="PASSWORD" auto-complete autofocus v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="display:none;">
        <el-input type="hidden" name="encode_type" v-model="encode_type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" id="submit" class="login_btn" @click="loginIn()">登录
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
    created () {
      var unameCookie = document.cookie.match('(^|;) ?' + 'USER_NAME_COOKIE' + '=([^;]*)(;|$)')
      this.uname = (unameCookie ? unameCookie[2] : '')
    },
    watch: {
      password () {
        // console.log(this.base64Encode(this.password))
      }
    },
    methods: {
      base64Encode (str) {
        return window.btoa(str)
      },
      loginIn () {
        var base64Pwd = this.password
        if (this.encode_type === 1 && base64Pwd !== '') {
          base64Pwd = this.base64Encode(base64Pwd)
        }
        this.$http.get('/logincheck.php', {
          params: {
            UNAME: this.uname,
            PASSWORD: base64Pwd,
            encode_type: this.encode_type
          }
        }).then(response => {
          console.log(response)
          this.$router.push('/')
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
  
  #login .input-wrap {
    width: 300px;
    margin: 24px auto;
  }
  
  #login .input-wrap .el-form-item__content {
    margin-left: 0px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: transparent;
    box-sizing: content-box;
    vertical-align: middle;
  }
  
  #login .input-wrap .el-form-item__content:hover {
    border-color: #8391a5
  }
  
  #login .input-wrap .el-form-item__content:hover svg.icon {
    -webkit-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation-name: swing;
    animation-name: swing;
  }
  
  #login .input-wrap .el-form-item__content svg.icon {
    width: 50px;
    color: #2196f3
  }
  
  #login .input-wrap .el-form-item__content .el-input {
    width: 240px
  }
  
  #login .input-wrap .el-form-item__content .el-input input {
    border: none;
    padding: 0;
    background: transparent
  }
  
  .login_btn {
    width: 300px
  }
</style>
