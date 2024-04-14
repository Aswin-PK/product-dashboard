<template>
  <el-container id="app">
    <el-header>
      <NavBar />
    </el-header>

    <el-container>
      <el-aside width="200px">
        <SideBar />
      </el-aside>

      <el-container>
        <el-main>
          <HomePage />
        </el-main>

        <el-footer>
          <FooterContainer />
        </el-footer>
      </el-container>

    </el-container>

  </el-container>
</template>

<script>
import NavBar from './components/Navbar.vue'
import SideBar from './components/Sidebar.vue'
import HomePage from './pages/Home.vue'
import FooterContainer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    HomePage,
    FooterContainer,
  },
  created() {
    this.$store.dispatch('setProducts', {})
    this.$store.dispatch('setCategories')
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
  height: calc(100svh - 120px);
  background-color: #ebeff6;
}

.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
