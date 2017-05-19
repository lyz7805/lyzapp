<template>
  <div id="main-header">
    <el-menu theme="dark" default-active="1" mode="horizontal" @select="">
      <el-col :xs="{span:18, push:3}" :sm="{span:5, push:0}" :md="4" :lg="3" class="logo">
        <i class="fa fa-tachometer"></i> {{ title }}
      </el-col>
      <el-col :xs="{span:3, pull:18}" :sm="2">
        <el-menu-item index="1">
          <!--<el-button type="text" size="large" @click="$router.back()" title="后退">
                <i class="fa fa-long-arrow-left"></i>
              </el-button>
              <el-button type="text" size="large" @click="$router.go(1)" title="前进">
                <i class="fa fa-long-arrow-right"></i>
              </el-button>-->
        </el-menu-item>
      </el-col>
      <el-col :xs="{span:3}" :sm="{span:4, push:13}" :md="{span:4, push:14}" :lg="{span:4, push:15}">
        <el-menu-item index="3" class="right-block">
          <el-button type="text" icon="search" size="small"></el-button>
        </el-menu-item>
      </el-col>
      <el-col :xs="24" :sm="{span:13, pull:4}" :md="{span:14, pull:4}" :lg="{span:15, pull:4}">
        <el-menu-item index="2" @click="$router.back()">
          <i class="fa fa-long-arrow-left"></i>
          后退
        </el-menu-item>
        <el-menu-item index="3" @click="$router.go(1)">
          前进
          <i class="fa fa-long-arrow-right"></i>
        </el-menu-item>
        <div class="">
  
        </div>
        <!--<el-col class="logo"><breadcrumb></breadcrumb></el-col>-->
      </el-col>
    </el-menu>
  </div>
</template>
<script>
  // import Breadcrumb from './Breadcrumb'
  export default {
    name: 'header',
    // components: {
    //   'breadcrumb': Breadcrumb
    // },
    data () {
      return {
        title: '管理面板'
      }
    }
  }

</script>
<style scoped>
  .logo {
    height: 60px;
    padding: 15px;
    line-height: 30px;
    font-family: 'SimHei';
    font-size: 1.3em;
    text-align: center;
    color: #1D8CE0;
  }
  
  @media (min-width: 768px) {
    .logo {
      border-right: 1px solid #fff;
    }
  }
</style>
