<template>
    <el-container>
      <el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
          <div class="title">
            <span>Login</span>
          </div>
          <el-form-item label="Username" prop="username">
            <el-input ref="inputField" v-model="ruleForm.username"></el-input>
          </el-form-item>
  
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="ruleForm.password" show-password />
          </el-form-item>
  
          <div v-if="showInvalidMessage" class="invalid-message" style="width: 100%; text-align: center; color: red;">
            <span>Incorrect Username or Password.</span>
          </div>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" @click="submitForm">Login</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-container>
</template>
  
<script setup>
import { ref, reactive, computed } from 'vue';
import { ElNotification, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const ruleFormRef = ref(null);
const ruleForm = reactive({
    username: '',
    password: '',
});
const rules = reactive({
    username: [
        { required: true, message: 'Please enter your username', trigger: 'blur' },
        // { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: 'Please enter your password', trigger: 'blur' },
        // { min: 7, max: 15, message: 'Length should be 7 to 15', trigger: 'blur' }, 
    ],
});

const showInvalidMessage = ref(false);

const isLoading = computed(() => store.getters.getAuthLoading);

const submitForm = async () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            const status = await store.dispatch('authenticateUser', ruleForm);
            if (status === 200) {
                console.log("Login success");
                loginSuccessMessage();
                router.push({ path: '/' });
                showInvalidMessage.value = false;
                // ElMessage.success("Submission Success");
            } else {
                showInvalidMessage.value = true;
                // ElMessage.error("Incorrect Username or Password.");
            }
        } else {
            ElMessage.error("Submission Failed");
        }
    });
};

const loginSuccessMessage = () => {
    ElNotification({
        title: 'Welcome Back!',
        message: 'Login successful',
        type: 'success'
    });
};

// onMounted(() => {
//     ruleFormRef.value.$refs.inputField.focus();
// });
</script>

<style scoped>
.el-container {
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-row{
    width: 20em;
    padding: 1em;
    border: 2px solid #E4E7ED;
    border-radius: 0.5em;
}
.el-button {
    margin-top: 0.5em;
    width: 100%;
}
.title {
    margin-bottom: 1em;
}
.title span {
    font-size: 1.4em;
}
</style>