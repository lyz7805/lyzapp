<template>
  <el-breadcrumb id="breadcrumb" separator="/">
    <!--<el-breadcrumb-item to="/" v-if="$route.path!=='/'">首页</el-breadcrumb-item>-->
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="item.path">{{ item.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
  export default {
    name: 'Breadcrumb'
  }
</script>
<style></style>
