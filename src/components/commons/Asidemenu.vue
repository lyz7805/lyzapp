<template>
  <el-row class="aside-menu">
    <el-menu theme="" :default-active="$route.path" unique-opened router @select="setBreadcrumb" @close="">
      <template v-for="(item, index) in $router.options.routes" v-if="item.isShow == undefined || item.isShow == true">
        <el-submenu :index="index+''" v-if="item.children!==undefined && item.children.length>0">
          <template slot="title">
            <i :class="item.iconCls ? item.iconCls : 'fa fa-file-text-o'"></i>{{ item.name }}
          </template>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="item.path + '/' + child.path" v-if="child.isShow == undefined || child.isShow == true">
            <i :class="child.iconCls ? child.iconCls : 'fa fa-file-o'"></i>{{ child.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path">
          <i :class="item.iconCls ? item.iconCls : 'fa fa-file-o'"></i>{{ item.name }}</el-menu-item>
      </template>
    </el-menu>
    <div class="support">技术支持：
      <a href="//www.94love1.win" target="_new">李志毅</a>
    </div>
  </el-row>
</template>
<script>
  export default {
    name: 'asidemenu',
    data () {
      return {
      }
    },
    methods: {
      setBreadcrumb (index, indexPath) {
        // console.log(index, indexPath)
        // console.log(this.$route)
      }
    }
  }

</script>
<style scoped>
  .aside-menu {
    height: 100%;
    background: #eef1f6;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .support {
    width: 100%;
    margin: 5px;
    font-size: 0.5em;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .support {
      display: none
    }
  }
</style>
