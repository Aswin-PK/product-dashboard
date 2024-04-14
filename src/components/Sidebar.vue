<template>
    <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item index="0" @click="handleProduct('')">
            <i class="el-icon-menu"></i>
            <span>All Products</span>
        </el-menu-item>
        <el-menu-item v-for="(category, index) in categories" :index="index+1" :key="index" @click="handleProduct(category)">
            <!-- <i class="el-icon-menu"></i> -->
            <span>{{ category }}</span>
        </el-menu-item>
</el-menu>
</template>

<script>
export default {
    name: 'SideBar',
    computed: {
        categories() {
            return this.$store.getters.getAllCategories;
        }
    },
    methods: {
        handleProduct(category) {
            this.$store.dispatch('setProducts', {category})
        }
    }
}
</script>

<style>
.el-menu-item {
    text-align: end;
}
</style>