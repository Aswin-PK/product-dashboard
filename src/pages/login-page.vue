<template>
    <el-container>
        <el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
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
                    { required: true, message: 'Please enter your password', trigger: blur},
                ],
            }
        }
    },
    computed: {
        AuthTokenPresent() {
            return this.$store.getAuthToken;
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.$store.dispatch('authenticateUser', this.ruleForm)
                    this.$router.push({ path: '/' })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted() {
        if(this.AuthTokenPresent) {
            this.router.push({ path: '/' })
        }
    }
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
    background-color: rgb(235, 235, 235);
}
.el-button {
    width: 100%;
}
</style>