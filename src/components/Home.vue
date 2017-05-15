<template>
  <el-row>
    <h5>欢迎使用！
      <span style="float:right;">技术支持：
        <a href="//www.94love1.win" target="_new">李志毅</a>
      </span>
    </h5>
    <el-row>
      <template v-for="(item, index) in $router.options.routes" v-if="index !== 0">
        <el-col :xs="6" :sm="4" :lg="3" :key="index">
          <div class="index">
            <router-link class="to" :to="item.path">
              <!--<img :src="img">-->
              <i class="icon" :class="item.iconCls"></i>
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

.index {
  margin: 10px 5px;
  padding: 10px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  text-align: center;
  font-size: 0.8em
}

.index a img {
  width: 90%
}

.index a .icon {
  font-size: 2.5em;
  color: #1d90e6
}

.index .to {
  display: block;
  text-decoration: none;
  color: #20a0ff;
}

.index .to div {
  margin-top: 10px
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
