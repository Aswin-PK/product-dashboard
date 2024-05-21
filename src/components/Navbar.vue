<template>
    <el-container>
        <div class="logo-container">
            <span><img src="../assets/logo.png" alt=""></span>
            <h1>Product-Dashboard</h1>
        </div>
        <div class="demo-fit">
            <span>{{ props.userDetails.username }}</span>
            <div class="block">
                <el-avatar shape="circle" fit="cover" :src="props.userDetails.image"></el-avatar>
            </div>
        </div>
    </el-container>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    userDetails: Object
})
</script>

<style scoped>
.el-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.6em
}
.logo-container span{
    width: 2.4em;
    height: 2.4em;
}
.logo-container span img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
}
.demo-fit {
    width: auto;
}
.demo-fit, .block {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
}
</style>