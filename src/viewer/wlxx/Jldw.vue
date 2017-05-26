<template>
	<el-row>
    <el-table :data="data" border max-height="600">
      <el-table-column type="index" width="80px" align="center"></el-table-column>
      <el-table-column prop="dwdm" label="单位编号" sortable width="" align="center"></el-table-column>
      <el-table-column prop="dwmc" label="单位名称" width="" align="center"></el-table-column>
      <el-table-column prop="xsws" label="小数位数" width="" align="center"></el-table-column>
      <el-table-column  label="操作" width="100px" align="center">
        <template scope="scope">
          <el-button type="text" size="small" @click.native.prevent="edit">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      data: []
    }
  },
  created () {
    var url = '/lyzapp/api/wlxx/jldw.php'
    axios.get(url).then(response => {
      this.data = response.data
    }).catch(() => {
      this.data = []
    })
  },
  methods: {
    edit () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
