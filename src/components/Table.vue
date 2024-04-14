<template>
    <el-row>
        <span style="float: right;margin-bottom: 1em;">
            <el-input placeholder="Search Product" v-model="input" clearable style="width: 15em">
            </el-input>
        </span>
        <el-table :data="tableData" stripe height="445" style="width: 100%">
            <el-table-column v-for="(field, index) in tableHeaders" :prop="field" :label="field" :key="index"
                width="180">
            </el-table-column>
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
                this.$store.dispatch('setProducts', {})
            else 
                this.$store.dispatch('searchProducts', searchValue)
        }
    }
}
</script>

<style>
</style>