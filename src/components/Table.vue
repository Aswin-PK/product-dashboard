<template>
    <el-row>
        <span style="float: right;margin-bottom: 1em;">
            <el-input placeholder="Search Product" v-model="input" clearable style="width: 15em">
            </el-input>
        </span>
        
        <el-table :data="tableData" stripe height="510" style="width: 100%;" class="custom-table" @row-click="handleClick">
            <!-- For the image column -->
            <el-table-column label="Image" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.thumbnail" :alt="scope.row.title+' Image'" style="width: 100px; height: 100px;" lazy>
                </template>
            </el-table-column>

            <div v-for="(field, index) in tableHeaders" :key="index">
                <el-table-column v-if="!['discountPercentage','thumbnail', 'images'].includes(field)" :prop="field" :label="field" fit>
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
        },
        handleClick(value) {
            console.log(value)
        }
    }
}
</script>

<style>
.custom-table.el-table--fit {
    border-radius: 0.8em;
}
.el-table-column {
    cursor: pointer;
}
</style>