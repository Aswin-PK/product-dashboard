<template>
  <el-container id="app">
    <el-header>
      <NavBar />
    </el-header>

    <el-container>
      <el-aside width="150px">
        <SideBar />
      </el-aside>

      <el-container class="main-container">

        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb> -->

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

  </el-container>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
import SideBar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
  },
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
