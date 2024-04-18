<template>
    <el-container>
        <span>
            <span>Displaying</span>
            <el-select v-model="defaultLimit" placeholder="Select" @change="handleLimitChange">
                <el-option v-for="item in limitOptions" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <span>Out of {{ displayItems.total }}</span>
        </span>

        <el-pagination background layout="prev, pager, next" :total="(displayItems.total/displayItems.limit)*10" @current-change="handleMove">
        </el-pagination>
    </el-container>
</template>

<script>
export default {
    name: 'FooterContainer',
    data() {
        return {
            limitOptions: [],
        }
    },
    computed: {
        displayItems: {
            get() {
                return this.$store.getters.getDisplayLimit;
            }
        },
        defaultLimit() {
            return (this.displayItems.limit < this.displayItems.total) ? this.displayItems.limit : this.displayItems.total
        },
        total_pages() {
            return (this.displayItems.total/this.selectedLimit)*10
        }
    },
    watch: {
        'displayItems.total': function(oldValue, newValue) {
            if(oldValue !== newValue) {
                this.limitOptions = []
                let limit = this.displayItems.limit
                const totalItems = this.displayItems.total;
                while(limit < totalItems) {
                    this.limitOptions.push(limit)
                    limit += 10
                }
                if(this.defaultLimit !== totalItems)
                    this.limitOptions.push(totalItems)
            }
        },
    },
    methods: {
        handleMove(val) {
            this.$store.dispatch('fetchProducts', {skip: val})
        },
        handleLimitChange(limit) {
            this.$store.dispatch('setLimit', limit)
            this.$store.dispatch('fetchProducts', {limit: limit})
        }
    },

}
</script>

<style scoped>
.el-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.el-container span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
}
.el-container span .el-select {
    width: 9ch;
}
</style>