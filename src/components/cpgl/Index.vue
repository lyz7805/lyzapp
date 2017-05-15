<template>
  <el-row>
    <template v-if="$route.matched.length === 1">
      <children-list></children-list>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </el-row>
</template>

<script>
import ChildrenList from '../ChildrenList'
export default {
  name: 'index',
  components: {
    'children-list': ChildrenList
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
