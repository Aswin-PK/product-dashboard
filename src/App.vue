<template>
  <el-container id="app">
    <router-view></router-view>
  </el-container>
</template>

<script>

export default {
  name: 'App',

  mounted() {
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.el-header > * {
  line-height: 60px;
}
.el-aside{
  height: calc(100svh - 60px);  /* 60px is the default height of el-header component */
  scrollbar-width: none;
}

.el-main {
  height: calc(100svh - 60px);
  background-color: #ebeff6;
}

</style>
