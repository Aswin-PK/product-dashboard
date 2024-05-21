<template>
    <el-row>
        <ProductTable />
        <FooterContainer />
    </el-row>
</template>
  

<script>
export default {
    name: 'HomePage'
}
</script>


<script setup>
import ProductTable from '@/components/ProductTable.vue'
import FooterContainer from '@/components/Footer.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
  
onMounted(()=> {
    store.dispatch('fetchProducts', {category: []})
})
</script>
  
<style>
</style>
