<template>
  <el-row>
    <template v-if="$route.matched.length === 2">
      <Children-list/>
    </template>
    <template v-else>
      <transition name="el-zoom-in-top" mode="out-in">
        <router-view></router-view>
      </transition>
    </template>
  </el-row>
</template>

<script>
  import ChildrenList from './ChildrenList'
  export default {
    name: 'Index',
    components: {
      ChildrenList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
