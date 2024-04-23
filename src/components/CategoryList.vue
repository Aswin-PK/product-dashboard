<template>
    <el-table :data="categories" stripe height="620">
        <!-- Render each category string value as a row -->
        <el-table-column label="Categories">
            <template slot-scope="scope">
                <div class="row" @click="handleCategory(scope.row)">
                    <span>{{ scope.row }}</span>
                    <span>
                        <i class="el-icon-d-arrow-right"></i>
                    </span>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'CategoryList',
    computed: {
        categories() {
            return this.$store.getters.getAllCategories;
        },
    },
    methods: {
        handleCategory(category) {
            this.$store.dispatch('fetchProducts', {category: [category]});
            this.$router.push({path: `/dashboard/categories/${category}`})
        }
    },
}
</script>

<style scoped>
.row {
    height: 2em;
    font-size: 1.2em;
    padding: 0 1.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
.row span:last-child i {
    transition: all 0.3s;
}
.row:hover span:last-child i {
    transform: scale(1.3) translateX(4px);
}
</style>