<template>
	<el-row>
    <el-table :data="data" border max-height="600">
      <el-table-column type="index" width="80px" align="center"></el-table-column>
      <el-table-column prop="cpxl" label="产品系列" sortable width="" align="center"></el-table-column>
      <el-table-column prop="xlmc" label="系列名称" width="" align="center"></el-table-column>
      <el-table-column prop="bz" label="备注" width="" align="center"></el-table-column>
      <el-table-column  label="操作" width="100px" align="center">
        <template scope="scope">
          <el-button type="text" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="产品系列">
          <el-input v-model="form.cpxl"></el-input>
        </el-form-item>
        <el-form-item label="系列名称">
          <el-input v-model="form.xlmc"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.bz"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="text" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="showOK">确定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      data: [],
      dialogVisible: false,
      editIndex: null,
      form: {}
    }
  },
  created () {
    var url = '/lyzapp/api/cpgl/cpxl.php'
    axios.post(url).then(response => {
      this.data = response.data
    }).catch(() => {
      this.data = []
    })
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
      this.form = row
      this.form.index = index
      this.editIndex = index
      this.dialogVisible = true
    },
    showOK () {
      this.data[this.editIndex] = this.form
      this.dialogVisible = false
      this.$message({
        showClose: true,
        message: '修改成功！',
        type: 'success'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
