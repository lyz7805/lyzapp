<template>
  <el-row>
    <el-col :span="24">
      <el-row class="ggzd" type="flex" justify="start" v-loading="loading">
        <div class="card">
          <div class="card-header">
            <el-button type="text" size="mini" @click="clearRadio('selectedXlid')" title="清除已选" :disabled="false">
              系列
              <i class="el-icon-delete el-icon--right"></i>
            </el-button>
          </div>
          <el-radio-group v-model="selectedXlid">
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
          <el-radio-group class="card-body" v-model="selectedZd[index]" size="small" @change="getCplb">
            <el-radio class="radio" v-for="item in item.zdlb" :key="item.id" :label="item.id">
              {{ /*item.id + */'(' + item.zdid + ')' + item.zdsm }}
            </el-radio>
          </el-radio-group>
        </div>
      </el-row>
    </el-col>
    <el-col :span="24">
      <!--<span>{{ selectedXlid }}</span>
        <span v-for="item in selectedZd">{{ item }},</span>
        <span>{{ selectedZd }}</span>-->
      <el-table :data="cplb" border max-height="340" style="width:100%">
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
import axios from 'axios'
export default {
  name: 'wllb',
  data () {
    return {
      loading: false,
      cpxl: [],
      cpxlzd: [],
      selectedXlid: '',
      selectedZd: [],
      cplb: []
    }
  },
  created () {
    var url = '/lyzapp/api/cpgl/cpxl.php'
    axios.post(url).then(response => {
      this.cpxl = response.data
    }).catch(() => {
      this.cpxl = []
    })
  },
  watch: {
    selectedXlid () {
      // this.selectedZd = []
      this.loading = true
      if (this.selectedXlid === '') {
        this.cpxlzd = []
        this.cplb = []
        this.loading = false
      } else {
        var url = '/lyzapp/api/cpgl/cpxlzd.php'
        axios.get(url, {
          params: {
            id: this.selectedXlid
          }
        }).then(response => {
          // console.log(response)
          for (var i = 0; i < response.data.length; i++) {
            this.selectedZd[i] = ''
          }
          this.cpxlzd = response.data
          this.getCplb()
          this.loading = false
        }).catch(() => {
          this.cpxlzd = []
          this.loading = false
        })
      }
    }
  },
  methods: {
    clearRadio (val, index = null) {
      if (index === null) {
        this[val] = ''
      } else {
        this.$set(this[val], index, '')
      }
    },
    getCplb () {
      var url = '/lyzapp/api/cpgl/cplb.php'
      axios.get(url, {
        params: {
          xlid: this.selectedXlid,
          zd: this.selectedZd.toString()
        }
      }).then(response => {
        this.cplb = response.data
      }).catch(() => {
        this.cplb = []
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ggzd {
  /*max-height: 300px;*/
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
  max-height: 200px;
  overflow-y: auto
}

.radio {
  width: 100%;
  /*border: 1px solid #ccc;*/
  margin: 0;
  padding: 10px;
  box-sizing: border-box
}
</style>
