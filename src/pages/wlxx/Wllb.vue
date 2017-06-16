<template>
  <el-row>
    <el-col :xs="24" :sm="8" :md="7" :lg="6">
      <!--<el-card>-->
      <wlfl @node-click="selected"></wlfl>
      <!--</el-card>-->
    </el-col>
    <el-col :xs="23" :sm="15" :md="16" :lg="17" :offset="1">
      <!--<el-card>-->
      <el-form ref="form" label-position="top" :model="wllb" label-suffix="：" label-width="100px">
        <el-form-item label="类别编号">
          <el-input v-model="wllb.lbbh" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="wllb.lbmc" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="对应条码号">
          <el-input v-model="wllb.dytmh" size="small" readonly></el-input>
        </el-form-item>
        <!--<el-form-item label="">
          <el-button type="success" icon="search" @click="">search</el-button>
        </el-form-item>-->
      </el-form>
      <!--</el-card>-->
    </el-col>
  </el-row>
</template>

<script>
// import axios from 'axios'
import Wlfl from './Wlfl'
export default {
  name: 'wllb',
  components: { 'wlfl': Wlfl },
  data () {
    return {
      wllb: {}
    }
  },
  methods: {
    selected (data) {
      this.wllb = data
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
