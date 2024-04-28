<template>
  <el-container id="app">
    <template>
      <el-dialog title="Your session has expired" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
        <!-- <span slot="footer" class="dialog-footer"> -->
          <el-button @click="handleClick('cancel')">Cancel</el-button>
          <el-button type="primary" @click="handleClick('extend')">Extend Session</el-button>
        <!-- </span> -->
      </el-dialog>
    </template>
    <router-view></router-view>
  </el-container>
</template>

<script>

export default {
  name: 'App',
  data() {
    return { dialogVisible: false }
  },
  computed: {
    isSessionExpired() {
      return this.$store.getters.getSessionStatus;
    }
  },
  watch: {
    isSessionExpired(newValue) {
      this.dialogVisible = newValue
    }
  },
  mounted() {
    this.$store.dispatch('fetchCategories'),
    this.$store.dispatch('getCurrentAuthUser')
  },
  methods: {

    // to disable the closing of the dialog box when clicked outside of that box
    handleClose() {
      return
    },

    // To handle the button click in the dialog box
    handleClick(clickedButton) {
      if(clickedButton === 'cancel') { // if user didn't clicked the extend session button, the page will redirect to login
        const response = this.$store.dispatch('logoutUser')
        if(response) {
          this.$router.push({ path: '/login' })
        }
      }
      else {
        this.$store.dispatch('extendSession')
        this.$store.commit('SESSION_EXPIRED', false)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
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
