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

        <el-pagination background layout="prev, pager, next" :total="(displayItems.total/displayItems.limit)*10" @current-change="handleMove" />
    </el-container>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

let limitOptions = ref([]);

const displayItems = computed(() => {
    return store.getters.getDisplayLimit;
})
const defaultLimit = computed(() => {
    return (displayItems.value.limit < displayItems.value.total) ? displayItems.value.limit : displayItems.value.total
})
watch(
    () => displayItems.value.total,
    (oldValue, newValue) => {
        if(oldValue !== newValue) {
            limitOptions.value = []
            let limit = displayItems.value.limit
            const totalItems = displayItems.value.total
            while(limit < totalItems) {
                limitOptions.value.push(limit)
                limit += 10
            }
            if(defaultLimit !== totalItems)
                limitOptions.value.push(totalItems)
        }
    },
    { deep: true }
)

const handleMove = (val) => {
    store.dispatch('fetchNextProducts', {skip: val})
}
const handleLimitChange = (limit) => {
    store.dispatch('setLimit', limit)
    store.dispatch('fetchProducts', {limit: limit})
}

onMounted(()=>{
    console.log(displayItems.value)
})
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