<template lang="html">
    <div class="page-login" >
            <div class="login-box">
                <div class="left-box"></div>
                <div class="right-box">
                    <h2 class="login-title">欢迎登录</h2>
                    <el-form :model="pageData" :rules="rules" ref="form">
                        <el-form-item prop="username">
                            <el-input type="text" v-model="pageData.username"  placeholder="用户名"></el-input>
                        </el-form-item>  
                        <el-form-item prop="password">
                            <el-input type="password" v-model="pageData.password"  placeholder="密码"></el-input>
                        </el-form-item>  
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            map: '',
            pageData: {
                username:'',
                password: ''
            },
            rules: {
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                  
                ]
            }
        }
    },
    methods: {
        
        
    },
    mounted() {
        this.init();
    },
    
}
</script>

<style lang="less" scoped>
.page-login{
    width: 100%;
    height: 100%;
    position: relative;
}
.login-box{
    width: 300rpx;
    padding: 20rpx;
    height: 200rpx;
    border:#ddd solid 1px;
    margin-left: -150rpx;
    margin-top:-90rpx;
    box-sizing: border-box;
    position:absolute;
     border-radius: 6rpx;
    left: 50%;
    top: 50%;
    .login-title{
        text-align: center;
    }
    /deep/ .el-button {
        margin-top: 10rpx;
        width: 100%;
       
    }
}

</style>
