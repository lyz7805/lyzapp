<template>
  <el-row>
    <el-col class="col" :span="24">
      <el-steps space="20%" :active="active" finish-status="success">
        <el-step title="物料信息" description="上传物料信息"></el-step>
        <el-step title="生产BOM" description="上传BOM清单"></el-step>
        <el-step title="产品清单" description="上传产品清单"></el-step>
        <el-step title="生成领料单" description="根据提交信息自动生成领料单"></el-step>
      </el-steps>
    </el-col>
    <el-col class="col" :span="24">
      <transition name="el-zoom-in-top" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <router-view :acitve="active"></router-view>
      </transition>
    </el-col>
    <el-col class="col" :span="24">
      <el-button type="text" size="small" v-show="active > 0" @click="preview">上一步</el-button>
      <el-tooltip effect="dark" placement="right" content="导入数据才能进行下一步操作">
        <el-button type="primary" size="small" v-show="active < 3" @click="next">下一步</el-button>
      </el-tooltip>
      <el-button type="primary" size="small" v-show="active == 3" @click="submit">计算</el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        active: 0
      }
    },
    watch: {
      active () {
        console.log(this.active)
        switch (this.active) {
          case 1:
            this.$router.replace('/scll/scbom')
            break
          case 2:
            this.$router.replace('/scll/sccpqd')
            break
          case 3:
            this.$router.replace('/scll/scllqd')
            break
          case 4:
            this.$router.replace('/scll/scllqd')
            break
          default:
            this.$router.replace('/scll/scwlxx')
            break
        }
      }
    },
    mounted () {
      if (this.active === 0) this.$router.replace('/scll/scwlxx')
    },
    methods: {
      preview () {
        if (this.active-- < 1) this.active = 0
        console.log(this.active)
      },
      next () {
        if (this.active++ > 2) this.active = 3
        console.log(this.active)
      },
      submit () {
        this.active = 4
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col {
    padding: 8px
  }
  
  .col button {
    margin-left: 8px;
    margin-right: 8px
  }
</style>
