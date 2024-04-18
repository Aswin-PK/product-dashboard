<template>
    <el-container>
        <CategoryList :tableData="getCategories" />
    </el-container>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue';

export default {
    name: 'CategoryListPage',
    components: {
        CategoryList
    },
    computed: {
        getCategories() {
            return this.$store.getters.getAllCategories;
        }
    },
}
</script>

<style scoped>
</style>