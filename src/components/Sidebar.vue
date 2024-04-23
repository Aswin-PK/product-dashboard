<template>
    <el-container>
        <el-menu default-active="0" class="el-menu-vertical-demo">
            <router-link to="/">
                <el-submenu index="0">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>All Products</span>
                    </template>
                    <router-link to="/dashboard/add-product">
                        <el-menu-item index="0-1" @click="allProduct">Add product</el-menu-item>
                    </router-link>
                </el-submenu>
            </router-link>
            <router-link to="/dashboard/categories">
                <el-menu-item index="1">
                    <i class="el-icon-tickets"></i>
                    <span>Categories</span>
                </el-menu-item>
            </router-link>
        </el-menu>
        <el-menu>
            <el-menu-item class="logout-menu-item" @click="handleLogout">
                <span style="color: red;">[<i class="el-icon-right" style="color: red;"></i>Logout</span>
            </el-menu-item>
        </el-menu>
    </el-container>
</template>

<script>
export default {
    name: 'SideBar',
    methods: {
        allProduct() {
            this.$store.dispatch('setFormData', [])
        },
        async handleLogout() {
            await this.$store.dispatch('logoutUser')
            this.logoutMessage()
            this.$router.push({path: '/login'})
        },
        logoutMessage() {
            this.$message('You have been logged out.');
        },
    }
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