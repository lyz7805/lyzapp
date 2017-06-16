<template>
	<el-row>
    <el-col :xs="23" :sm="7" :offset="1">
      <!--<el-card>-->
        <wlfl></wlfl>
      <!--</el-card>-->
    </el-col>
    <el-col :xs="23" :sm="14" :offset="1">
        <!--<el-card>-->
          <el-form ref="form" label-position="top" :model="selected_node" label-suffix="：">
            <el-form-item label="类别编号">
              <el-input v-model="selected_node.id" readonly></el-input>
            </el-form-item>
            <el-form-item label="类别名称">
              <el-input v-model="selected_node.label" readonly></el-input>
            </el-form-item>
            <el-form-item label="对应条码号">
              <el-input v-model="selected_node.label" readonly></el-input>
            </el-form-item>
            <!--<el-form-item label="">
              <el-input v-model=""></el-input>
            </el-form-item>-->
          </el-form>
        <!--</el-card>-->
    </el-col>
	</el-row>
</template>

<script>
import Wlfl from './Wlfl'
export default {
  name: 'wllb',
  components: {
    'wlfl': Wlfl
  },
  data () {
    return {
      data: [],
      selected_node: {}
    }
  },
  methods: {
    selected (data) {
      this.selected_node = data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
