<template>
  <el-row>
    <el-col :span="24">
      <el-row class="ggzd" type="flex" justify="start" v-loading="loading">
        <div class="card">
          <div class="card-header">
            <el-tooltip effect="dark" content="清除已选" placemen="bottom-start">
              <el-button type="text" size="mini" @click="clearRadio('selectedCplbid')" :disabled="false">
                产品类别
                <i class="el-icon-delete el-icon--right"></i>
              </el-button>
            </el-tooltip>
          </div>
          <el-radio-group class="card-body" v-model="selectedCplbid" size="small" fill="#ffeb3b" text-color="#03A9F4">
            <el-radio-button class="radio" v-for="item in cplb" :key="item.id" :label="item.id">
              {{ item.lbmc }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="card" v-show="selectedCplbid">
          <div class="card-header">
            <el-tooltip effect="dark" content="清除已选" placemen="bottom-start">
              <el-button type="text" size="mini" @click="clearRadio('selectedXlid')" :disabled="false">
                产品系列
                <i class="el-icon-delete el-icon--right"></i>
              </el-button>
            </el-tooltip>
          </div>
          <el-radio-group class="card-body" v-model="selectedXlid" size="small">
            <el-radio-button class="radio" v-for="item in cpxl" :key="item.id" :label="item.id">
              {{ item.xlmc }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="card" v-for="(item,index) in cpxlzd" :key="index">
          <div class="card-header">
            <el-tooltip effect="dark" content="清除已选" placemen="bottom-start">
              <el-button type="text" size="mini" @click="clearRadio('selectedZd', index)">
                {{ '字段' + item.zdjc }}
                <i class="el-icon-delete el-icon--right"></i>
              </el-button>
            </el-tooltip>
          </div>
          <el-radio-group class="card-body" v-model="selectedZd[index]" size="small" @change="getCpxxlb">
            <el-radio-button class="radio" v-for="item in item.zdlb" :key="item.id" :label="item.id" :disabled="isNotAvaliable(selectedXlid, item.cpxl)">
              {{ item.id + '(' + item.zdid + ')' + item.zdsm }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-table class="cpxx table-condensed" :data="cpxxlb" border max-height="340" style="width:100%">
        <el-table-column type="index" width="55px" align="center"></el-table-column>
        <el-table-column prop="wlbm" label="物料编码" width="150px" align="center"></el-table-column>
        <!--<el-table-column prop="ggzd" label="规格字段" width=""></el-table-column>-->
        <el-table-column prop="cpmc" label="产品名称" width="150px" align="center"></el-table-column>
        <el-table-column prop="ggxh" label="规格型号" width="180px"></el-table-column>
        <el-table-column prop="jsyq" label="技术要求" min-width="200px"></el-table-column>
        <el-table-column prop="bz" label="备注" width="180px"></el-table-column>
        <el-table-column prop="bz" label="操作" width="50px" align="center" fixed="right">
          <template scope="scope">
            <el-tooltip effect="dark" content="查询详细信息" placement="left">
              <el-button type="text" size="small" @click="showDetail(scope.row)">详细</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog id="cpinfo" title="产品信息" :visible.sync="showDetailDialog" size="small" v-loading="detailLoading">
      <el-form :model="cpxx" label-position="right" label-suffix="：" label-width="100px">
        <el-form-item label="物料编码">
          <el-input v-model="cpxx.wlbm" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="cpxx.cpmc" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="cpxx.ggxh" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="技术要求">
          <el-input v-model="cpxx.jsyq" type="textarea" autosize readonly></el-input>
        </el-form-item>
        <el-form-item label="标配清单">
          <!--<el-input v-model="cpxx.bpqd" size="small" readonly></el-input>-->
          <el-button type="text" size="small" @click="viewPdf(cpxx.bpqd)">标配清单</el-button>
        </el-form-item>
        <el-form-item label="说明书">
          <!--<el-input v-model="cpxx.sms" size="small" readonly></el-input>-->
          <!--<router-link to="/pdf">说明书</router-link>-->
          <el-button type="text" size="small" @click="viewPdf(cpxx.sms)">说明书</el-button>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="cpxx.bz" type="textarea" autosize readonly></el-input>
        </el-form-item>
        <el-form-item label="其他">
          <el-input v-model="cpxx.qt" size="small" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isshowpdf" size="large" top="0" custom-class="pdfviewer" :show-close="true">
      <!--<c-pdf @closepdf="closePdf" :pdfurl="testpdfurl"></c-pdf>-->
      <embed width="100%" height="100%" name="plugin" id="plugin" :src="pdfurl" type="application/pdf" internalinstanceid="3">
    </el-dialog>
  </el-row>
</template>

<script>
  // import pdf from '../components/pdfjs/Pdfjs'
  export default {
    name: 'wllb',
    // components: {
    //   'c-pdf': pdf
    // },
    data () {
      return {
        loading: false,
        cplb: [], // 产品类别
        cpxl: [], // 产品系列
        cpxlzd: [], // 产品系列字段
        selectedCplbid: '',
        selectedXlid: '',
        selectedZd: [],
        cpxxlb: [],
        cpxx: {},
        showDetailDialog: false,
        detailLoading: false,
        isshowpdf: false,
        // testpdfurl: '//cdn.mozilla.net/pdfjs/tracemonkey.pdf',
        pdfurl: ''
      }
    },
    created () {
      var url = '/lyzapp/api/cpgl/cplb.php'
      this.$http.post(url).then(response => {
        this.cplb = response.data
      }).catch(() => {
        this.cplb = []
      })
    },
    watch: {
      selectedCplbid () {
        this.selectedXlid = ''
        this.selectedZd = []
        var cplbid = this.selectedCplbid
        this.loading = true
        if (cplbid === '') {
          this.cpxlzd = []
          this.cpxxlb = []
        } else {
          this.$http.all([this.getCpxl(cplbid), this.getCpxlzd(cplbid)]).then(
            this.$http.spread((cpxl, cpxlzd) => {
              this.cpxl = cpxl.data
              this.cpxlzd = cpxlzd.data
              this.selectedZd = new Array(cpxlzd.data.length)
              console.log(cpxl, cpxlzd, this.selectedZd)
            })
          )
          this.getCpxxlb()
        }
        this.loading = false
      },
      selectedXlid () {
        this.loading = true
        this.getCpxxlb()
        this.loading = false
      }
    },
    methods: {
      getCpxl (cplbid) {
        var url = '/lyzapp/api/cpgl/cpxl.php'
        return this.$http.get(url, {
          params: {
            cplbid: cplbid
          }
        })
      },
      getCpxlzd (cplbid, xlid = null) {
        var url = '/lyzapp/api/cpgl/cpxlzd.php'
        var params = { cplbid: cplbid }
        if (xlid !== null) {
          params.xlid = xlid
        }
        return this.$http.get(url, {
          params
        })
      },
      getCpxxlb () {
        console.log(this.selectedZd)
        var url = '/lyzapp/api/cpgl/cpxxlb.php'
        this.$http.get(url, {
          params: {
            cplbid: this.selectedCplbid,
            xlid: this.selectedXlid,
            zd: this.selectedZd.toString()
          }
        }).then(response => {
          this.cpxxlb = response.data
        }).catch(() => {
          this.cpxxlb = []
        })
      },
      clearRadio (val, index = null) {
        if (index === null) {
          this[val] = ''
        } else {
          this.$set(this[val], index, '')
        }
      },
      isNotAvaliable (search, array) {
        if (search === null || search === '') {
          return false
        } else {
          for (var index = 0; index < array.length; index++) {
            if (search === array[index]) {
              return false
            } else {
              continue
            }
          }
          return true
        }
      },
      showDetail (row) {
        var url = '/lyzapp/api/cpgl/cpxx.php'
        this.detailLoading = true
        this.$http.get(url, {
          params: {
            cpid: row.id
          }
        }).then(response => {
          this.showDetailDialog = true
          this.cpxx = response.data
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '对不起，没有获取到信息，请稍后再试 ☹',
            type: 'error'
          })
        })
        this.detailLoading = false
      },
      viewPdf (pdfname) {
        this.pdfurl = '/lyzapp/attach/cpgl/201705/' + pdfname + '.pdf'
        this.isshowpdf = true
      },
      closePdf () {
        this.isshowpdf = false
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ggzd {
    /*max-height: 300px;*/
    margin-bottom: 10px;
    overflow: auto
  }
  
  .card {
    /*height: 100%;*/
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    margin: 5px;
    box-shadow: 3px 2px 4px 2px rgba(0, 0, 0, .12), 0px 0px 6px 0px rgba(0, 0, 0, .04);
  }
  
  .card-header {
    /*width: 100%;*/
    text-align: center;
    border-bottom: 1px solid #d1dbe5;
    /*margin: 0;*/
    padding: 5px;
    box-sizing: border-box
  }
  
  .card-body {
    max-height: 190px;
    overflow-y: auto
  }
  
  .radio {
    width: 100%;
    /*border: 1px solid #ccc;*/
    margin: 0;
    padding: 0.5em;
    box-sizing: border-box
  }
</style>

<style>
  .card-body .el-radio-button .el-radio-button__inner {
    width: 100%;
    margin: 5px 0;
    /*box-sizing: border-box;*/
    border: none;
    border-radius: initial;
    text-align: left
  }
  
  .card-body .radio:hover {
    /*border-bottom: 1px solid #f00;*/
    background-color: #20a0ff
  }
  
  .card-body .radio .el-radio__input input,
  .card-body .radio .el-radio__label {
    font-size: 12px
  }
  
  #cpinfo input,
  #cpinfo textarea {
    border: none;
    border-bottom: 1px dashed;
    border-radius: 0;
    /*text-shadow: 0px 1px 0px #2196F3;*/
  }
  
  .pdfviewer {
    height: 100%;
    overflow: hidden;
    margin: 0;
    background-color: #525659
  }
  
  .pdfviewer .el-dialog__header {
    display: none
  }
  
  .pdfviewer .el-dialog__body {
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden
  }
</style>
