<template>
  <div id="login">
    <img src="/static/templates/2017_01/tdxk.png" class="tdxk">
    <form class="login_form" name="form1" method="post" autocomplete="off" onsubmit="return CheckForm();">
      <div id="center" class="center">
        <img src="/static/templates/2017_01/logo.png" class="logo">
        <div class="input-wrap name">
          <i for="name">
            <img src="/static/templates/2017_01/userName.png">
          </i>
          <input type="text" id="name" name="UNAME" maxlength="20" autocomplete="off" onmouseover="this.focus()" onfocus="this.select()" v-model="uname" placeholder="请输入用户名">
        </div>
        <div class="input-wrap password">
          <i for="password">
            <img src="/static/templates/2017_01/passWord.png">
          </i>
          <input type="password" id="password" name="PASSWORD" autocomplete="new-password" onmouseover="this.focus()" onfocus="this.select()" v-model="password" placeholder="请输入密码">
        </div>
        <input type="hidden" name="encode_type" v-model="encode_type">
        <button type="submit" id="submit" class="login_btn" @click="loginIn()" title="登录"></button>
      </div>
    </form>
  </div>
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
<style scoped>
  #login {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: url(/static/templates/2017_01/login_bg1920.jpg) no-repeat;
    background-size: 100% 100%;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    text-align: center
  }
  
  #login .tdxk {
    position: fixed;
    top: 100px;
    left: 100px;
    width: 100px;
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
  
  #login .center {
    width: 100%;
    height: 100%
  }
  
  #login .center .logo {
    margin: 10px auto
  }
  
  #login .center .input-wrap {
    width: 250px;
    height: 50px;
    margin: 10px auto;
    line-height: 50px;
    border-bottom: 1px solid #cccccc;
  }
  
  #login .center input {
    border: none;
    outline: none;
    background: none;
    height: 30px;
    padding: 10px
  }
  
  #login .center i {
    position: relative
  }
  
  #login .center i img {
    width: 15px;
    position: relative;
    top: 4px
  }
  
  #login form .login_btn {
    margin-top: 50px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    width: 262px;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    border-radius: 46px;
    background-color: transparent;
    border: none;
    background-image: url(/static/templates/2017_01/login_btn.png);
    background-position: -24px -62px;
  }
  
  #login form .login_btn:hover {
    background-position: -24px -144px;
  }
</style>
