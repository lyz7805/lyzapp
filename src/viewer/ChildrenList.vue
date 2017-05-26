<template>
  <el-row>
    <h5>{{ $route.name }}:</h5>
    <el-row>
      <template v-for="(item, index) in children">
        <el-col :xs="12" :sm="6" :lg="4" :key="index" class="list-item">
          <div class="index">
            <router-link class="to" :to="$route.path + '/' + item.path">
              <i class="icon" :class="item.iconCls ? item.iconCls : 'fa fa-file-o'"></i>
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
</style>
