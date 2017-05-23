<template>
  <el-row>
    <el-table :data="cplb" border max-height="600">
      <el-table-column type="index" width="80px" align="center"></el-table-column>
      <el-table-column prop="cplb" label="产品类别" sortable width="" align="center"></el-table-column>
      <el-table-column prop="lbmc" label="类别名称" width="" align="center"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="dialogVisible">
      <el-form :model="cplbxx">
        <el-form-item label="产品类别">
          <el-input v-model="cplbxx.cplb"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="cplbxx.lbmc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="text" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateCPlb(editIndex)">确定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  export default {
    name: 'cplb',
    data () {
      return {
        cplb: [],
        dialogVisible: false,
        editIndex: null,
        cplbxx: {}
      }
    },
    created () {
      this.getCplb()
    },
    methods: {
      getCplb () {
        var url = '/lyzapp/api/cpgl/cplb.php'
        this.$http.get(url).then(response => {
          this.cplb = response.data
        }).catch(() => {
          this.cplb = []
        })
      },
      handleEdit (index, row) {
        var url = '/lyzapp/api/cpgl/cplb.php'
        this.$http.get(url, {
          params: {
            id: row.id
          }
        }).then(response => {
          this.cplbxx = response.data
          this.dialogVisible = true
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '未获取到数据，请稍后再试'
          })
        })
        this.editIndex = index
        console.log(row, this.$data)
      },
      updateCPlb (index) {
        this.$set(this.cplb, index, this.cplbxx)
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
