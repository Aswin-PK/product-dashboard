<template>
    <el-row>
        <span style="float: right;margin-bottom: 1em;">
            <el-input placeholder="Search Product" v-model="input" clearable style="width: 15em">
            </el-input>
        </span>
        
        <el-table v-loading="isLoading" :data="tableData" stripe height="510" style="width: 100%;" class="custom-table" @row-click="handleClick">
            <!-- For the image column -->
            <el-table-column label="Image">
                <template slot-scope="scope">
                    <img :src="scope.row.thumbnail" :alt="scope.row.title+' Image'" style="width: 120px; height: 100px; object-fit: cover;" lazy>
                </template>
            </el-table-column>

            <div v-for="(field, index) in tableHeaders" :key="index">
                <el-table-column v-if="!['id', 'discountPercentage','thumbnail', 'images'].includes(field)" :prop="field" :label="field" fit>
                </el-table-column>
            </div>
        </el-table>
    </el-row>
</template>

<script>
export default {
    name: 'TableContainer',
    data() {
        return {
            input: '',
            debounceTimer: null,
        }
    },
    computed: {
        tableHeaders() {
            return this.$store.getters.getTableColumnHeaders;
        },
        tableData() {
            return this.$store.getters.getAllProducts;
        },
        isLoading() {
            return this.$store.getters.getLoading;
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
            console.log(value)
            this.$store.dispatch('fetchSingleProduct', value.id)
            this.$router.push({ path: `/product/${value.id}` })
        }
    }
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