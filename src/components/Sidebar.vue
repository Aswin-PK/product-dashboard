<template>
    <el-container>
        <el-menu default-active="1" class="el-menu-vertical-demo" >
            <router-link to="/" style="text-decoration: none">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Menu /></el-icon>
                        <span>All Products</span>
                    </template>
                    <router-link to="/dashboard/add-product" style="text-decoration: none">
                        <el-menu-item index="1-1" @click="allProduct">
                            <el-icon><EditPen /></el-icon>Add product</el-menu-item>
                    </router-link>
                </el-sub-menu>
            </router-link>
            <router-link to="/dashboard/categories" style="text-decoration: none">
                <el-menu-item index="2">
                    <el-icon><List /></el-icon>
                    <span>Categories</span>
                </el-menu-item>
            </router-link>
        </el-menu>
        <el-menu>
            <el-menu-item class="logout-menu-item" @click="handleLogout">
                <span style="color: red;">[<el-icon><Right /></el-icon>Logout</span>
            </el-menu-item>
        </el-menu>
    </el-container>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>

<script setup>
import { ElMessage } from 'element-plus'
import { EditPen, List, Menu, Right } from '@element-plus/icons-vue'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const allProduct = () => {
    store.dispatch('setFormData', [])
}
const handleLogout = async() => {
    const response = await store.dispatch('logoutUser')
    if(response) {
        logoutMessage()
        router.push({path: '/login'})
    }
}
const logoutMessage = () => {
    ElMessage('You have been logged out.');
}
</script>

<style scoped>
.el-container {
    height: 100%;
    padding: 0 0 1em 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}
.el-menu {
    width: 100%;
    margin-top: 1em;
}
.el-menu-item {
    text-align: start;
}
.logout-menu-item {
    text-align: center;
}
</style>