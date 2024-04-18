<template>
    <el-row>
        <el-row type="flex" justify="end" :gutter="10">
            <el-col :span="4" v-if="$route.path === '/'">
                <el-select v-model="selectedCategories" @change="handleCategoryChange" multiple collapse-tags style="margin-left: 20px;" placeholder="Filter">
                    <el-option v-for="item in allCategories" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="float: right;margin-bottom: 1em;">
                <el-input placeholder="Search Product" v-model="input" clearable style="width: 15em">
                </el-input>
            </el-col>
        </el-row>

        <el-table v-loading="isLoading" :data="tableData" stripe height="510" style="width: 100%;" class="custom-table"
            @row-click="handleClick">
            <!-- For the image column -->
            <el-table-column label="Image">
                <template slot-scope="scope">
                    <img :src="scope.row.thumbnail" :alt="scope.row.title+' Image'"
                        style="width: 120px; height: 100px; object-fit: cover;" lazy>
                </template>
            </el-table-column>

            <div v-for="(field, index) in tableHeaders" :key="index">
                <el-table-column v-if="!['id', 'discountPercentage','thumbnail', 'images'].includes(field)"
                    :prop="field" :label="field" fit>
                </el-table-column>
            </div>
        </el-table>
    </el-row>
</template>

<script>
export default {
    name: 'ProductTable',
    data() {
        return {
            input: '',
            debounceTimer: null,
            selectedCategories: [] // TO store the categories selected from the filter option
        }
    },
    computed: {
        tableHeaders() {
            return this.$store.getters.getTableColumnHeaders;
        },
        isLoading() {
            return this.$store.getters.getLoading;
        },
        tableData() {
            return this.$store.getters.getAllProducts;
        },
        allCategories() {
            return this.$store.getters.getAllCategories;
        }

    },
    watch: {
        input(newValue) {
            clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(()=> {
                this.fetchProducts(newValue);
            }, 500)
        }
    },
    methods: {
        fetchProducts(searchValue) {
            if(searchValue === '')
                this.$store.dispatch('fetchProducts', {})
            else 
                this.$store.dispatch('searchProducts', searchValue)
        },
        handleClick(value) {
            this.$store.dispatch('fetchSingleProduct', value.id)
            const currentRoute = this.$router.currentRoute

            if(currentRoute.path === '/') {
                this.$router.push({ path: `/all-products/${value.id}` });
            }
            else if(currentRoute.path.startsWith('/categories/')) {
                const category = currentRoute.params.category;
                console.log("At table", category, value.id)
                this.$router.push({ path: `/categories/${category}/${value.id}` });
            }
        },
        handleCategoryChange() {
            this.$store.dispatch('fetchProducts', {category: this.selectedCategories})
        }
    },
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