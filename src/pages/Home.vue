<template>
    <el-row>
        <ProductTable />
        <FooterContainer />
    </el-row>
</template>
  
<script>
import ProductTable from '@/components/ProductTable.vue'
import FooterContainer from '@/components/Footer.vue';
  
export default {
    name: 'HomePage',
    components: {
        ProductTable,
        FooterContainer
    },
    mounted() {
        this.$store.dispatch('fetchProducts', {category: []})
    }
}
</script>
  
<style>
</style>
