<template>
  <el-container id="app">
    <template>
      <el-dialog title="Your session has expired" v-model="dialogVisible" width="25%" :before-close="handleClose">
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
// Stop error resizeObserver
const debounce = (callback, delay) => {
  let tid;
  return function (...args) {
    const ctx = this;
    tid && clearTimeout(tid);
    tid = setTimeout(() => {
      callback.apply(ctx, args);
    }, delay);
  };
};

const _ = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ {
  constructor(callback) {
    callback = debounce(callback, 20);
    super(callback);
  }
};

export default {
  name: 'App'
}

</script>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const dialogVisible = ref(true)

const isSessionExpired = computed(() => store.getters.getSessionStatus);

watch(
  () => isSessionExpired.value,
  (newValue) => {
    dialogVisible.value = newValue
  },
  { deep: true }
)

onMounted(() => {
    store.dispatch('fetchCategories')
    store.dispatch('getCurrentAuthUser')
})

    // to disable the closing of the dialog box when clicked outside of that box
const handleClose = () => {
  return
}

    // To handle the button click in the dialog box
const handleClick = (clickedButton) => {
    if(clickedButton === 'cancel') { // if user didn't clicked the extend session button, the page will redirect to login
      const response = store.dispatch('logoutUser')
      if(response) {
        router.push({ path: '/login' })
      }
    }
    else {
      store.dispatch('extendSession')
      store.commit('SESSION_EXPIRED', false)
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
