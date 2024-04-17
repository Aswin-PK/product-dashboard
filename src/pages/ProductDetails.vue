<template>
    <el-container v-loading="loading">
        <el-row  style="background-color: #fefefe; width: 100%">
            <el-col :span="10" style="background-color: #f6f6f6;">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="(item, index) in product.images" :key="index">
                        <img :src="item" :alt="product.title + 'image'"
                            style="width: 100%; height: 100%; object-fit: contain;" lazy />
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col class="product-details" :span="14" style="padding: 1em 3em;">
                <el-row>
                    <h2>{{ product.title }}</h2>
                </el-row>
                <el-row>
                    <p>{{ product.description }}</p>
                </el-row>
                <el-row>
                    <h2>Rs. {{ product.price }}</h2>
                </el-row>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
export default {
    name: 'ProductDetails',
    data() {
        return {
            loading: true,
        }
    },
    computed: {
        product() {
            return this.$store.getters.getSingleProduct;
        },
    },
    watch: {
        product(newValue) {
            if (newValue !== null) {
                this.loading = false;
            }
        }
    },
}

</script>

<style scoped>
.product-details .el-row {
    margin-bottom: 1em;
}
</style>