<template>
    <div class="form-container" style="background-color: rgb(208 216 230);padding: 1em;">
        <el-form ref="form" :model="formData" label-width="120px" @submit.prevent="handleProduct"
        style="display: flex; flex-direction: column; gap: 1em">
            <el-row>
                <span style="font-size: 1.6em;">Product Details</span>
            </el-row>
            <el-row type="flex" style="gap: 1em">
                <el-input v-model="formData.title" autocomplete="off" placeholder="Product name"></el-input>
                <el-input v-model="formData.brand" autocomplete="off" placeholder="brand"></el-input>
                <el-input v-model="formData.category" autocomplete="off" placeholder="category"></el-input>
            </el-row>
            <el-input type="textarea" v-model="formData.description" placeholder="Something about the product..."></el-input>
            <el-row type="flex" style="gap: 1em">
                <el-input v-model="formData.price" autocomplete="off" placeholder="price"></el-input>
                <el-input v-model="formData.rating" autocomplete="off" placeholder="rating"></el-input>
                <el-input v-model="formData.stock" autocomplete="off" placeholder="stock"></el-input>
            </el-row>
            <!-- <span>Upload Images</span> -->
            <!-- <el-row>
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" multiple>
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-row> -->

            <el-form-item>
                <el-button @click="clearForm">Clear</el-button>
                <el-button type="primary" @click="handleProduct">{{ formData.id ? "Update" : "Add" }} Product</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

let form = reactive([]);
// const dialogImageUrl = ref('');
// const dialogVisible = ref(false)
let responseStatusCode = ref()

const formData = computed(() => store.getters.getFormData);
const statusCode = computed(() => store.getters.getStatusCode);

watch(
    formData,
    (newValue) => {
        Object.assign(form, newValue);
    },
    { deep: true }
)

watch(
    statusCode,
    (newValue) => {
        responseStatusCode.value = newValue
    },
    { deep: true }
)

const handleProduct = async() => {
    if(formData.id){
        await store.dispatch('editProduct', formData)
        if(responseStatusCode.value == 200) {
            successMessage('updated');
            router.push({path: '/'})
        }
    }
    else {
        await store.dispatch('addProduct', formData)
        if(responseStatusCode.value == 200) {
            successMessage('added');
            router.push({path: '/'})
        }
    }
}

const clearForm = () => {
    store.dispatch('setFormData', [])
}
const successMessage = (text) => {
    ElMessage({
        showClose: true,
        message: `Product details ${text} successfully`,
        type: 'success'
    });
}
</script>

<style scoped>
</style>