<template>
  <el-row>
    <el-col :xs="24" :sm="8" :md="7" :lg="6">
      <!--<wlfl @node-click="selected"></wlfl>-->
    </el-col>
    <el-col :xs="23" :sm="15" :md="16" :lg="17" :offset="1">
      <el-col :span="23">
        <el-button class="right-block" type="text" icon="plus" size="small" @click="handleAdd">增加产品类别</el-button>
      </el-col>
      <el-col :span="1"></el-col>
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
      <el-dialog title="产品类别" :visible.sync="dialogVisible">
        <el-form :model="cplbxx">
          <el-form-item label="产品类别">
            <el-input v-model="cplbxx.cplb" size="small"></el-input>
          </el-form-item>
          <el-form-item label="类别名称">
            <el-input v-model="cplbxx.lbmc" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="text" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateCPlb(editIndex)">确定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>import Wlfl from '../wlxx/Wlfl'
  export default {
    name: 'cplb',
    components: {
      wlfl: Wlfl
    },
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
      handleAdd () {
        this.cplbxx = {}
        this.dialogVisible = true
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
