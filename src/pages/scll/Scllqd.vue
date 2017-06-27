<template>
  <el-row>
    <el-col :span="24" style="padding: 8px;">
      <el-steps space="20%" :active="active" finish-status="success">
        <el-step title="物料信息" description="上传物料信息" :status="status0"></el-step>
        <el-step title="生产BOM" description="上传BOM清单" :status="status1"></el-step>
        <el-step title="产品清单" description="上传产品清单" :status="status2"></el-step>
        <el-step title="生成领料单" description="根据提交信息自动生成领料单" icon="share" :status="status3"></el-step>
      </el-steps>
    </el-col>
    <el-table id="wstable" :data="scllqd" stripe border max-height="500">
      <el-table-column v-for="col in tableColumn" :key="col.prop" :prop="col.prop" :label="col.label" :sortable="col.sortable || false" :align="col.align || 'left'"></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  export default {
    name: 'Scllqd',
    data () {
      return {
        active: 0,
        status0: 'process',
        status1: 'process',
        status2: 'process',
        status3: 'process',
        tableColumn: [
          { prop: '产品编号', label: '产品编号', sortable: true, align: 'left' },
          { prop: '产品名称', label: '物料名称' },
          { prop: '产品规格型号', label: '产品规格型号' },
          { prop: '物料编号', label: '物料编号', sortable: true, align: 'left' },
          { prop: '物料名称', label: '物料名称' },
          { prop: '物料规格型号', label: '物料规格型号' },
          { prop: '物料计量单位', label: '物料计量单位', align: 'center' },
          { prop: 'kcsl', label: '库存数量', sortable: true, align: 'right' },
          { prop: '需用数量', label: '需用数量', sortable: true, align: 'right' },
          { prop: '领用数量', label: '领用数量', sortable: true, align: 'right' },
          { prop: '缺少数量', label: '缺少数量', sortable: true, align: 'right' }
        ],
        scllqd: []
      }
    },
    created () {
      var wlxx = this.$store.state.scwlxx
      var bomqd = this.$store.state.scbom
      var cpqd = this.$store.state.sccpqd
      if (wlxx.length === 0) {
        this.status0 = 'error'
        this.$message({
          type: 'warning',
          message: '请导入生产物料信息'
        })
      } else if (bomqd.length === 0) {
        this.active = 1
        this.status0 = 'success'
        this.status1 = 'error'
        this.$message({
          type: 'warning',
          message: '请导入生产BOM清单'
        })
      } else if (cpqd.length === 0) {
        this.active = 2
        this.status0 = this.status1 = 'success'
        this.status2 = 'error'
        this.$message({
          type: 'warning',
          message: '请导入产成品清单'
        })
      } else {
        this.active = 3
        this.status0 = this.status1 = this.status2 = 'success'
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
                    'kcsl': kcsl,
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
    }
  }
</script>
