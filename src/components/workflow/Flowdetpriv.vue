<template>
  <el-row>
    <el-col :span="24">
      <el-form inline method="post" class="form-inline" id="form">
        <el-form-item label="流程名称：">
          <el-select v-model="flow_id" size="small" placeholder="请选择" clearable filterable @change="submitForm">
            <el-option v-for="item in flow_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:none">
          <el-button type="success" size="small" native-type="submit" icon="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-tabs v-model="activeName" class="el-col-24">
        <el-tab-pane label="步骤权限" name="1">
          <el-table class="table-condensed" :data="tableData" border max-height="500" v-loading.bodylock="loading" element-loading-text="拼命加载中...">
            <el-table-column prop="prcs_id" label="序号" width="65"></el-table-column>
            <el-table-column prop="name" label="步骤名称" width="110"></el-table-column>
            <el-table-column class-name="column-table" label="经办权限" width="200" header-align="center">
              <template scope="scope">
                <el-table :data="scope.row.prcs" stripe style="width:100%; height:100%;" :show-header="false">
                  <el-table-column label="label" width="60" align="center">
                    <template scope="scope">{{ scope.row.label }}：</template>
                  </el-table-column>
                  <el-table-column prop="prcs" label="prcs" min-width=""></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="writable" label="可写字段" width=""></el-table-column>
            <el-table-column prop="hidden" label="保密字段" width=""></el-table-column>
            <el-table-column prop="required" label="必填字段" width=""></el-table-column>
            <el-table-column fixed="right" label="操作" width="70" align="center">
              <template scope="scope">
                <el-button type="text" size="mini" @click="viewPrcsDetail(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog v-model="dialogVisible" title="流程步骤属性" top="7.5%" size="large">
            <div v-loading="loadingdialog">
              <iframe :src="flow_prcs_det"></iframe>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="流程设计图" name="2">
          <iframe :src="flow_view" id="flow_view" scolling="no" frameborder="0"></iframe>
        </el-tab-pane>
        <el-tab-pane label="流程说明" name="3">
          <iframe :src="flow_explan"></iframe>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  import AppJs from './Flowdetpriv.js'
  export default {
    name: 'flow',
    mixins: [AppJs]
  }
</script>

<style>
  .el-tab-pane table {
    width: 100%;
    /*max-height: 550px;*/
  }
  
  .el-tab-pane iframe {
    width: 100%;
    /*min-height: 250px;*/
    height: 500px;
    border: none;
  }
  
  .table-condensed tbody>tr>td.column-table>.cell {
    padding: 0
  }
</style>
