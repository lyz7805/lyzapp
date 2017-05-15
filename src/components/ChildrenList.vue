<template>
  <el-row>
    <h5>{{ $route.name }}：</h5>
    <el-row>
      <template v-for="(item, index) in children">
        <el-col :xs="6" :sm="4" :lg="3" :key="index">
          <div class="index">
            <router-link class="to" :to="$route.path + '/' + item.path">
              <i class="icon" :class="item.iconCls"></i>
              <div>
                {{ item.name }}
              </div>
            </router-link>
          </div>
        </el-col>
      </template>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'children-list',
  data () {
    return {
      children: []
    }
  },
  watch: {
    '$route' () {
      this.setChildren()
    }
  },
  created () {
    this.setChildren()
  },
  methods: {
    setChildren () {
      var routes = this.$router.options.routes
      for (var index = 0; index < routes.length; index++) {
        if (this.$route.path === routes[index].path) {
          this.children = routes[index].children
          break
        }
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row h5 {
  margin: 10px;
  color: #8391a5
}

.index {
  margin: 10px 5px;
  padding: 10px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, .12);
  text-align: center;
  font-size: 0.8em
}

.index .to {
  display: block;
  text-decoration: none;
  color: #20a0ff;
}

.index .to img {
  width: 90%
}

.index .to .icon {
  font-size: 2.5em;
  color: #1d90e6
}

.index .to div {
  margin-top: 10px
}
</style>
