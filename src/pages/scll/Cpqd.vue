<template>
  <el-row>
    <el-col :span="24">
      <div class="el-button el-button--plain el-button--mini">
        <input type="file" name="xlfile" id="xlf" :accept="accept" @change="submitUpload">
        <el-button type="warning" icon="delete" size="mini" @click="$store.commit('setSccpqd', [])">清空数据</el-button>
      </div>
      <div class="el-upload__tip">
        只能上传
        <span style="color: red;">xls,xlsx</span>文件
      </div>
    </el-col>
    <el-table :data="$store.state.sccpqd" stripe border max-height="500" id="wstable">
      <el-table-column type="index" min-width="100px"></el-table-column>
      <el-table-column v-for="col in fileColumn" :key="col.prop" :prop="col.prop" :label="col.label" :sortable="col.sortable || false" :align="col.align || 'left'"></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'Cpqd',
    data () {
      return {
        accept: '.xls,.xlsx',
        rABS: true,
        worker: true,
        editable: true,
        fileColumn: [
          { prop: '产品编号', label: '产品编号', sortable: true, align: 'left' },
          { prop: '产品名称', label: '物料名称' },
          { prop: '规格型号', label: '规格型号' },
          { prop: '计量单位', label: '计量单位', align: 'center' },
          { prop: '产品数量', label: '产品数量', sortable: true, align: 'right' }
        ]
      }
    },
    created () {
      console.log(this.$store.state)
    },
    methods: {
      submitUpload (evt) {
        if (evt !== undefined) {
          var files = evt.target.files
          var f = files[0]
          var reader = new FileReader()
          reader.onload = (e) => {
            var data = e.target.result
            var workbook = XLSX.read(data, { type: 'binary' })

            var worksheetName = workbook.SheetNames[0]
            var worksheet = workbook.Sheets[worksheetName]

            this.HTML = XLSX.utils.sheet_to_html(worksheet, { editable: this.editable, header: '', footer: '' })
            this.$store.commit('setSccpqd', XLSX.utils.sheet_to_json(worksheet))
            console.log(this.$store.state)
          }
          reader.readAsBinaryString(f)
        }
      }
    }
  }
</script>

<style>
  
</style>

