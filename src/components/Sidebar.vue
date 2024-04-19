<template>
    <el-menu default-active="0" class="el-menu-vertical-demo">
        <router-link to="/">
            <el-submenu>
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>All Products</span>
                </template>
                <router-link to="/add-product">
                    <el-menu-item index="0-1" @click="allProduct">Add product</el-menu-item>
                </router-link>
            </el-submenu>
        </router-link>
        <router-link to="/categories">
            <el-menu-item index="1">
                <i class="el-icon-tickets"></i>
                <span>Categories</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
export default {
    name: 'SideBar',
    methods: {
        allProduct() {
            this.$store.dispatch('setFormData', [])
        }
    }
}
</script>

<style scoped>
.el-menu {
    margin-top: 1em;
}
.el-menu-item {
    text-align: start;
}
</style>