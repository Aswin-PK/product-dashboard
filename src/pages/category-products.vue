<template>
    <el-row>
        <ProductTable />
        <FooterContainer />
    </el-row>
</template>

<script>

import ProductTable from '@/components/ProductTable.vue'
import FooterContainer from '@/components/Footer.vue'

export default {
    name: 'CategoryProductsPage',
    components: {
        ProductTable,
        FooterContainer
    },
}
</script>

<style scoped>
</style>