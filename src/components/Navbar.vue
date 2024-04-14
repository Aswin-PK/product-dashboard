<template>
    <div class="logo-container">
        <span><img src="../assets/logo.png" alt=""></span>
        <h1>Product-Dashboard</h1>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style>
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
</style>