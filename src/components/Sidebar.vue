<template>
    <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item index="0" @click="handleAllProduct">
            <i class="el-icon-goods"></i>
            <span>All Products</span>
        </el-menu-item>
        <el-checkbox-group v-model="checkList" @change="handleCategorySelect"> 
            <el-menu-item v-for="(category, index) in categories" :index="index+1" :key="index">
                <el-checkbox :label="category"></el-checkbox>
            </el-menu-item>
        </el-checkbox-group>
</el-menu>
</template>

<script>
export default {
    name: 'SideBar',
    data() {
        return {
            checkList: [],
        }
    },
    computed: {
        categories() {
            return this.$store.getters.getAllCategories;
        },
    },
    methods: {
        handleCategorySelect() {
            this.$store.dispatch('fetchProducts', {category: this.checkList})
        },

        handleAllProduct() {
            this.checkList = [];
            this.handleCategorySelect();
        },
    }
}
</script>

<style scoped>
.el-menu-item {
    text-align: start;
}
</style>