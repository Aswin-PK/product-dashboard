<template>
    <el-container>
        <el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <div class="title">
                    <span>Login</span>
                </div>
                <el-form-item label="Username" prop="username">
                    <el-input ref="inputField" v-model="ruleForm.username"></el-input>
                </el-form-item>
                
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                
                <div v-if="showInvalidMessage" class="invalid-message" style="width: 100%; text-align: center;">
                    <span style="color: red; ">Incorrect Username or Password.</span>
                </div>
                <el-form-item>
                    <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')">Login</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-container>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            ruleForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: 'Please enter your username', trigger: 'blur' },
                    // { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur'},
                    { min: 7, max: 15, message: 'Length should be 7 to 15', trigger: 'blur' }, 
                ],
            },
            showInvalidMessage: false,
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters.getAuthLoading;
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const status = await this.$store.dispatch('authenticateUser', this.ruleForm)
                    if(status === 200) {
                        this.loginSuccessMessage();
                        this.$router.push({ path: '/' })
                        this.showInvalidMessage = false
                    }
                    else {
                        this.showInvalidMessage = true
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // Success message
        loginSuccessMessage() {
            this.$notify({
                title: 'Welcome Back !',
                message: 'Login successful',
                type: 'success'
            });
        },
    },
    mounted() {
        this.$refs.inputField.focus();
    },
}
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