<template>
  <iframe src="http://localhost" frameborder="0" width="100%" height="100%">
  </iframe>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
      }
    },
    beforeMount () {
      console.log(this)
      if (this.$data.isLogin === true) {
        this.$router.push('/')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    position: fixed;
    width: 100%;
    height: 100%
  }
  
  #app {
    height: 100%
  }
</style>
