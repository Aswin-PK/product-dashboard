import { createApp } from 'vue';
import { store } from './store'
import { Routes } from './routes'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import '@vue/compat'
// import { configureCompat } from 'vue'

// configureCompat({
//   COMPONENT_V_MODEL: false,
//   WATCH_ARRAY: false,
//   TRANSITION_GROUP_ROOT: false,
//   INSTANCE_ATTRS_CLASS_STYLE: false,
//   ATTR_FALSE_VALUE: null,
//   COMPONENT_ASYNC: false
// })



const router = createRouter({
  history: createWebHistory(),
  routes: Routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Allow navigation to route if authenticated
    }
  } else {
    next(); // Allow navigation to non-authenticated routes
  }
});


const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')