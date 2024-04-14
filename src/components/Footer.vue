<template>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="displayItems.total"
        @current-change="handleMove"
        >
    </el-pagination>
</template>

<script>
export default {
    name: 'FooterContainer',
    computed: {
        displayItems: {
            get() {
                return this.$store.getters.getDisplayLimit;
            }
        }
    },
    methods: {
        handleMove(val) {
            this.$store.dispatch('setProducts', {skip: val})
        }
    },

}
</script>

<style>
</style>