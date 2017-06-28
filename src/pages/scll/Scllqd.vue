<template>
  <el-row>
    <el-col class="col" :span="24">
      <el-button type="plain" size="small" @click="exportFile">导出</el-button>
    </el-col>
    <el-table id="wstable" :data="scllqd" stripe border max-height="500">
      <el-table-column v-for="col in tableColumn" :key="col.prop" :prop="col.prop" :label="col.label" :sortable="col.sortable || false" :align="col.align || 'left'"></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import XLSX from 'xlsx'
  import FileSaver from 'file-saver'
  export default {
    name: 'Scllqd',
    props: {
      active: {
        type: Number,
        required: false,
        default: 1
      }
    },
    data () {
      return {
        tableColumn: [
          { prop: '产品编号', label: '产品编号', sortable: true, align: 'left' },
          { prop: '产品名称', label: '物料名称' },
          { prop: '产品规格型号', label: '产品规格型号' },
          { prop: '物料编号', label: '物料编号', sortable: true, align: 'left' },
          { prop: '物料名称', label: '物料名称' },
          { prop: '物料规格型号', label: '物料规格型号' },
          { prop: '物料计量单位', label: '物料计量单位', align: 'center' },
          // { prop: 'kcsl', label: '库存数量', sortable: true, align: 'right' },
          { prop: '需用数量', label: '需用数量', sortable: true, align: 'right' },
          { prop: '领用数量', label: '领用数量', sortable: true, align: 'right' },
          { prop: '缺少数量', label: '缺少数量', sortable: true, align: 'right' }
        ],
        scllqd: []
      }
    },
    created () {
      console.log(this.active, XLSX)
      var wlxx = this.$store.state.scwlxx
      var bomqd = this.$store.state.scbom
      var cpqd = this.$store.state.sccpqd
      if (wlxx.length === 0) {
        this.$message({
          type: 'warning',
          message: '请导入生产物料信息'
        })
      } else if (bomqd.length === 0) {
        this.$message({
          type: 'warning',
          message: '请导入生产BOM清单'
        })
      } else if (cpqd.length === 0) {
        this.$message({
          type: 'warning',
          message: '请导入产成品清单'
        })
      } else {
        var n = 0
        for (var i = 0; i < cpqd.length; i++) {
          for (var j = 0; j < bomqd.length; j++) {
            if (bomqd[j]['产品编号'] === cpqd[i]['产品编号']) {
              for (var k = 0; k < wlxx.length; k++) {
                if (bomqd[j]['物料编号'] === wlxx[k]['物料编号']) {
                  var kcsl = wlxx[k]['库存数量']
                  var xysl = bomqd[j]['单位用量'] * cpqd[i]['产品数量']
                  var lysl = xysl
                  var qssl = 0
                  if (kcsl > xysl) {
                    wlxx[k]['库存数量'] -= xysl
                  } else {
                    lysl = kcsl
                    qssl = xysl - kcsl
                    wlxx[k]['库存数量'] = 0
                  }
                  this.scllqd[n] = {
                    '产品编号': cpqd[i]['产品编号'],
                    '产品名称': cpqd[i]['产品名称'],
                    '产品规格型号': cpqd[i]['规格型号'],
                    '物料编号': bomqd[j]['物料编号'],
                    '物料名称': bomqd[j]['物料名称'],
                    '物料规格型号': bomqd[j]['规格型号'],
                    '物料计量单位': bomqd[j]['计量单位'],
                    // 'kcsl': kcsl,
                    '需用数量': xysl,
                    '领用数量': lysl,
                    '缺少数量': qssl || ''
                  }
                  n++
                  break
                }
              }
              continue
            }
          }
        }
      }
      console.log(this.scllqd)
    },
    methods: {
      s2ab (s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF
        }
        return buf
      },
      exportFile () {
        var wbOpts = {
          type: 'binary',
          bookSST: false,
          bookType: 'xlsx',
          compression: true,
          Props: {
            Title: '生产领料单',
            Author: '李志毅',
            Company: '河南省日立信股份有限公司'
            // CreatedDate: Date()
          }
        }
        var ws = XLSX.utils.json_to_sheet(this.scllqd)
        var wb = {
          SheetNames: ['生产领料单'],
          Sheets: {
            生产领料单: ws
          }
        }
        console.log(wb)
        var wbOut = XLSX.write(wb, wbOpts)
        var blob = new Blob([this.s2ab(wbOut)], { type: 'application/octet-stream' })
        FileSaver.saveAs(blob, '生产领料单.xlsx')
      }
    }
  }
</script>
