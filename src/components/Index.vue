<template>
  <el-row>
    <h5>欢迎使用！
      <span style="float:right;">技术支持：
        <a href="//www.94love1.win" target="_new">李志毅</a>
      </span>
    </h5>
    <transition-group tag="el-row" class="animated fadeIn">
      <template v-for="(item, index) in $router.options.routes" v-if="item.path !== '/' && (item.isShow == undefined || item.isShow == true)">
        <el-col :xs="12" :sm="6" :lg="4" :key="index" class="list-item">
          <div class="index">
            <router-link class="to" :to="item.path">
              <icon :name="item.iconCls ? item.iconCls : 'icon-Category'"></icon>
              <div>{{ item.name }}</div>
            </router-link>
          </div>
        </el-col>
      </template>
    </transition-group>
  </el-row>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row h5 {
    margin: 8px
  }
  
  .footer {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    text-align: right
  }
</style>
