<template>
    <el-row style="max-width: 100%;">

        <el-col :span="24" style="display: flex;justify-content: end; padding-right: 5em;gap: 2em;">
            <!-- Category filter box -->
            <el-col :span="4" v-if="$route.path === '/dashboard/all-products'">
                <el-select 
                    v-model="selectedCategories" @change="handleCategoryChange" 
                    multiple 
                    collapse-tags 
                    collapse-tags-tooltip 
                    placeholder="Filter"
                    style="margin-left: 20px">
                    <el-option v-for="item in allCategories" :key="item" :label="item" :value="item" />
                </el-select>
            </el-col>

            <!-- Product search box -->
            <el-col :span="4" style="margin-bottom: 1em;">
                <el-input placeholder="Search Product" v-model="input" clearable style="width: 18em">
                </el-input>
            </el-col>

        </el-col>

        <!-- Product Listing Table -->
        <el-col :span="24">
            <el-table v-loading="isLoading" :data="tableData" stripe height="510" style="width: 100%;" class="custom-table" fit>
                <!-- For the image column -->
                <el-table-column label="Image">
                    <template #default="scope">
                        <img :src="scope.row.thumbnail" :alt="scope.row.title+' Image'"
                        style="width: 120px; height: 100px; object-fit: cover;" lazy>
                    </template>
                </el-table-column>

                <template v-for="(field, index) in tableHeaders">
                    <el-table-column v-if="!['id', 'discountPercentage','thumbnail', 'images'].includes(field)"
                        :prop="field" :label="field" :key="index">
                    </el-table-column>
                </template>

                
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-tooltip content="View Product" placement="top">
                            <el-button size="small" type="info" :icon="View"
                                @click="handleViewProduct(scope.row)"></el-button>
                        </el-tooltip>
                        <router-link to="/dashboard/edit-product">
                            <el-button size="small" @click="handleEditProduct(scope.row)">Edit</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script setup>
import { View } from '@element-plus/icons-vue'
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore();
const router = useRouter();

const input = ref('')
let debounceTimers = []
const selectedCategories = ref([]) // TO store the categories selected from the filter option
// const form = reactive([])
// const fileList = reactive([])


const tableHeaders = computed(() => {
    return store.getters.getTableColumnHeaders;
})
const isLoading = computed(() => {
    return store.getters.getLoading;
})
const tableData = computed(() => {
    return store.getters.getAllProducts;
})
const allCategories = computed(() => {
    return store.getters.getAllCategories;
})

watch(input, (newValue) => {
    clearTimeout(debounceTimers);

    debounceTimers = setTimeout(()=> {
        fetchProducts(newValue);
    }, 500);
})

const fetchProducts = (searchValue) => {
    if(searchValue === '')
        store.dispatch('fetchProducts', {})
    else 
        store.dispatch('searchProducts', searchValue)
}
const handleViewProduct = (value) => {
    store.dispatch('fetchSingleProduct', value.id)
    const currentRoute = router.currentRoute.value

    if(currentRoute.path.includes('/all-products')) {
        router.push({ path: `/dashboard/all-products/${value.id}` });
    }
    else if(currentRoute.path.includes('/categories/')) {
        const category = currentRoute.params.category;
        router.push({ path: `/dashboard/categories/${category}/${value.id}` });
    }
}
const handleCategoryChange = () => {
    store.dispatch('fetchProducts', {category: selectedCategories})
}
const handleEditProduct = (value) => {
    store.dispatch('setFormData', value)
}
</script>

<style scoped>
.custom-table.el-table--fit {
    border-radius: 0.8em;
}
.el-table-column {
    cursor: pointer;
}
</style>