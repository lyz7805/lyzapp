<template>
  <el-row>
    <h5>欢迎使用！
      <span style="float:right;">技术支持：
        <a href="//www.94love1.win" target="_new">李志毅</a>
      </span>
    </h5>
    <el-row>
      <template v-for="(item, index) in $router.options.routes" v-if="item.path !== '/' && (item.isShow == undefined || item.isShow == true)">
        <el-col :xs="6" :sm="4" :lg="3" :key="index" class="list-item">
          <div class="index">
            <router-link class="to" :to="item.path">
              <!--<img :src="img">-->
              <i class="icon" :class="item.iconCls ? item.iconCls : 'fa fa-file-text-o'"></i>
              <div>
                <!--<i :class="item.iconCls"></i> -->{{ item.name }}
              </div>
            </router-link>
          </div>
        </el-col>
      </template>
    </el-row>
  </el-row>
</template>

<script>
  import img from '@/assets/logo.png'
  export default {
    name: 'index',
    data () {
      return {
        img: img
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row h5 {
    margin: 10px
  }
  
  .item {
    float: left;
    width: 20%;
    display: block;
    box-sizing: border-box
  }
  
  .footer {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    text-align: right
  }
  
  @media (max-width: 460px) {
    .item {
      width: 25%
    }
  }
</style>
