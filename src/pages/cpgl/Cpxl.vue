<template>
  <el-row>
    <el-col :span="23">
      <el-button class="right-block" type="text" icon="plus" size="small" @click="handleAdd">增加产品系列</el-button>
    </el-col>
    <el-col :span="1"></el-col>
    <el-table :data="data" border max-height="600">
      <el-table-column type="index" width="80px" align="center"></el-table-column>
      <!--<el-table-column prop="lbmc" label="产品类别" width="" align="center"></el-table-column>-->
      <el-table-column prop="cpxl" label="产品系列" sortable width="" align="center"></el-table-column>
      <el-table-column prop="xlmc" label="系列名称" width="" align="center"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template scope="scope">
          <el-button type="text" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="产品系列" :visible.sync="dialogVisible">
      <el-form :model="form" label-position="left" label-suffix="：" label-width="100px">
        <el-form-item label="产品类别">
          <!--<el-input v-model="form.lbmc"></el-input>-->
          <el-select v-model="form.lbid" placeholder="产品类别" size="small">
            <el-option v-for="item in cplb" :key="item.id" :label="item.lbmc" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品系列">
          <el-input v-model="form.cpxl" size="small"></el-input>
        </el-form-item>
        <el-form-item label="系列名称">
          <el-input v-model="form.xlmc" size="small"></el-input>
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
  export default {
    name: 'cpxl',
    data () {
      return {
        cplb: [],
        data: [],
        dialogVisible: false,
        editIndex: null,
        form: {}
      }
    },
    created () {
      this.getCplb()
      var url = '/lyzapp/api/cpgl/cpxl.php'
      this.$http.post(url).then(response => {
        this.data = response.data
      }).catch(() => {
        this.data = []
      })
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
        this.dialogVisible = true
        this.form = {}
      },
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
