<template>
    <el-row style="width: 100%;" :gutter="20">
        <el-col :span="8" v-for="(category, index) in categories" :key="index" >
            <div class="category-item" @click="handleCategory(category)">
                <span>{{ category }}</span>
                <span>
                    <i class="el-icon-d-arrow-right"></i>
                </span>
            </div>
        </el-col>
    </el-row>
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
.el-col {
    margin-top: 1em;
}
.category-item {
    height: 3.5em;
    background-color: rgb(206, 218, 228);
    padding: 1em;
    border-radius: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
.category-item:hover {
    transform: scale(1.02);
}
</style>