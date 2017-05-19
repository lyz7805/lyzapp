<template>
  <el-row>
    <el-col :span="24">
      <el-row class="ggzd" type="flex" justify="start" v-loading="loading">
        <div class="card">
          <div class="card-header">
            <el-button type="text" size="mini" @click="clearRadio('selectedCplbid')" title="清除已选" :disabled="false">
              产品类别
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </div>
          <el-radio-group class="card-body" v-model="selectedCplbid" size="small" fill="#ffeb3b" text-color="#03A9F4">
            <el-radio-button class="radio" v-for="item in cplb" :key="item.id" :label="item.id">
              {{ item.lbmc }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="card" v-show="selectedCplbid">
          <div class="card-header">
            <el-button type="text" size="mini" @click="clearRadio('selectedXlid')" title="清除已选" :disabled="false">
              产品系列
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </div>
          <el-radio-group class="card-body" v-model="selectedXlid" size="small">
            <el-radio-button class="radio" v-for="item in cpxl" :key="item.id" :label="item.id">
              {{ item.xlmc }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="card" v-for="(item,index) in cpxlzd" :key="index">
          <div class="card-header">
            <el-button type="text" size="mini" @click="clearRadio('selectedZd', index)" title="清除已选">
              {{ '字段' + item.zdjc }}
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </div>
          <el-radio-group class="card-body" v-model="selectedZd[index]" size="small" @change="getCpxxlb">
            <el-radio-button class="radio" v-for="item in item.zdlb" :key="item.id" :label="item.id" :disabled="true">
              {{ /*item.id + */'(' + item.zdid + ')' + item.zdsm }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-row>
    </el-col>
    <!--<el-col :span="24">
          <el-row class="ggzd" type="flex" justify="start" v-loading="loading">
            <div class="card">
              <div class="card-header">
                <el-button type="text" size="mini" @click="clearRadio('selectedCplbid')" title="清除已选" :disabled="false">
                  产品类别
                  <i class="el-icon-delete el-icon--right"></i>
                </el-button>
              </div>
              <el-radio-group class="card-body" v-model="selectedCplbid" size="small" fill="#ffeb3b" text-color="#03A9F4">
                <el-radio class="radio" v-for="item in cplb" :key="item.id" :label="item.id">
                  {{ item.lbmc }}
                </el-radio>
              </el-radio-group>
            </div>
            <div class="card" v-show="selectedCplbid">
              <div class="card-header">
                <el-button type="text" size="mini" @click="clearRadio('selectedXlid')" title="清除已选" :disabled="false">
                  产品系列
                  <i class="el-icon-delete el-icon--right"></i>
                </el-button>
              </div>
              <el-radio-group class="card-body" v-model="selectedXlid" size="small">
                <el-radio class="radio" v-for="item in cpxl" :key="item.id" :label="item.id">
                  {{ item.xlmc }}
                </el-radio>
              </el-radio-group>
            </div>
            <div class="card" v-for="(item,index) in cpxlzd" :key="index">
              <div class="card-header">
                <el-button type="text" size="mini" @click="clearRadio('selectedZd', index)" title="清除已选">
                  {{ '字段' + item.zdjc }}
                  <i class="el-icon-delete el-icon--right"></i>
                </el-button>
              </div>
              <el-radio-group class="card-body" v-model="selectedZd[index]" size="small" @change="getCpxxlb">
                <el-radio class="radio" v-for="item in item.zdlb" :key="item.id" :label="item.id">
                  {{ '(' + item.zdid + ')' + item.zdsm }}
                </el-radio>
              </el-radio-group>
            </div>
          </el-row>
        </el-col>-->
    <el-col :span="24">
      <el-table :data="cpxxlb" border max-height="340" style="width:100%">
        <el-table-column type="index" width="50px" align="center"></el-table-column>
        <el-table-column prop="wlbm" label="物料编码" width="150px" align="center"></el-table-column>
        <!--<el-table-column prop="ggzd" label="规格字段" width=""></el-table-column>-->
        <el-table-column prop="cpmc" label="产品名称" width="150px" align="center"></el-table-column>
        <el-table-column prop="ggxh" label="规格型号" width="180px"></el-table-column>
        <el-table-column prop="jsyq" label="技术要求" min-width="200px"></el-table-column>
        <el-table-column prop="bz" label="备注" width="180px"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'wllb',
    data () {
      return {
        loading: false,
        cplb: [], // 产品类别
        cpxl: [], // 产品系列
        cpxlzd: [], // 产品系列字段
        selectedCplbid: '',
        selectedXlid: '',
        selectedZd: [],
        cpxxlb: []
      }
    },
    created () {
      var url1 = '/lyzapp/api/cpgl/cplb.php'
      this.$http.post(url1).then(response => {
        this.cplb = response.data
      }).catch(() => {
        this.cplb = []
      })
    },
    watch: {
      selectedCplbid () {
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
            })
          )
        }
        this.loading = false
      },
      selectedXlid () {
        this.loading = true
        if (this.selectedXlid === '') {
          this.cpxlzd = []
          this.cpxxlb = []
          this.loading = false
        } else {
          var url = '/lyzapp/api/cpgl/cpxlzd.php'
          this.$http.get(url, {
            params: {
              id: this.selectedXlid
            }
          }).then(response => {
            // console.log(response)
            for (var i = 0; i < response.data.length; i++) {
              this.selectedZd[i] = ''
            }
            this.cpxlzd = response.data
            this.getCpxxlb()
            this.loading = false
          }).catch(() => {
            this.cpxlzd = []
            this.loading = false
          })
        }
      }
    },
    methods: {
      getCpxl (cplbid) {
        var url = '/lyzapp/api/cpgl/cpxl.php'
        return this.$http.get(url, {
          params: {
            cplb: cplbid
          }
        })
      },
      getCpxlzd (cplbid) {
        var url = '/lyzapp/api/cpgl/cpxlzd.php'
        return this.$http.get(url, {
          params: {
            cplb: cplbid
          }
        })
      },
      clearRadio (val, index = null) {
        if (index === null) {
          this[val] = ''
        } else {
          this.$set(this[val], index, '')
        }
      },
      getCpxxlb () {
        var url = '/lyzapp/api/cpgl/cpxxlb.php'
        this.$http.get(url, {
          params: {
            xlid: this.selectedXlid,
            zd: this.selectedZd.toString()
          }
        }).then(response => {
          this.cpxxlb = response.data
        }).catch(() => {
          this.cpxxlb = []
        })
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
</style>
