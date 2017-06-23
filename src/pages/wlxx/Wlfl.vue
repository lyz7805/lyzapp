<template>
  <el-row>
    <!--<el-card>-->
    <el-input type="success" placeholder="请输入关键词搜索" v-model="filter_str" icon="search" autofocus size="small"></el-input>
    <p></p>
    <el-tree ref="wltree" :data="data" :filter-node-method="filterNode" accordion @node-click="selected"></el-tree>
    <!--</el-card>-->
  </el-row>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'wlfl',
    data () {
      return {
        filter_str: '',
        data: []
      }
    },
    created () {
      var url = '/lyzapp/api/wlxx/wlfl.php'
      axios.get(url).then(response => {
        // console.log(response)
        this.data = response.data
      }).catch(() => {
        this.data = []
      })
    },
    watch: {
      filter_str (val) {
        this.$refs.wltree.filter(val)
      }
    },
    methods: {
      selected (data) {
        this.$emit('node-click', data)
      },
      filterNode (val, data) {
        if (!val) return true
        return data.label.indexOf(val) !== -1
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
