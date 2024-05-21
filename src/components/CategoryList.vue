<template>
    <el-table :data="categories" stripe height="620">
        <!-- Render each category string value as a row -->
        <el-table-column label="Categories">
            <template #default="scope">
                <div class="row" @click="handleCategory(scope.row)">
                    <span>{{ scope.row }}</span>
                    <span>
                        <el-icon><DArrowRight /></el-icon>
                    </span>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { DArrowRight } from '@element-plus/icons-vue';

import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const categories = computed(() => {
    return store.getters.getAllCategories;
})

const handleCategory = (category) => {
    store.dispatch('fetchProducts', {category: [category]});
    router.push({path: `/dashboard/categories/${category}`})
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