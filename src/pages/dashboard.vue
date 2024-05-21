<template>
    <el-container>
        <el-header>
            <NavBar :userDetails="userDetails" />
        </el-header>

        <el-container>
            <el-aside width="170px">
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
export default {
    name: 'DashBoard'
}
</script>

<script setup>
import NavBar from '@/components/Navbar.vue'
import SideBar from '@/components/Sidebar.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const userDetails = computed(() => store.getters.getAuthUser);

</script>

<style>
</style>