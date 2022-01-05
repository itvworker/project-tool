<template>
    <ElContainer  
            class="el-login-root"
        >
            <div class="el-login-box">
                <ElForm
                    :model="loginData"
                    :rules="rules"
                >
                    <ElFormItem
                        prop="username"
                    >
                        <ElInput  
                        v-model="loginData.username"
                        :placeholder="t('pleaseInput')"
                            />
                    </ElFormItem>

                    <ElFormItem
                        prop="pwd"
                    >
                        <ElInput  
                        v-model="loginData.pwd"
                        :placeholder="t('pleaseInput')"
                        type="password"
                            />
                    </ElFormItem>

                    <div class="login-link-bar">
                        <ElLink class="link" type="primary">忘记密码</ElLink>
                    </div>
                    <ElButton  class="el-login-btn" type="primary">登录</ElButton>
                </ElForm>
            </div>
        </ElContainer>
</template>
<script lang="ts" setup>
import { ElButton, ElContainer, ElForm, ElFormItem, ElInput, ElLink } from 'element-plus'
import {  reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
const {t} = useI18n();
        // 登录字段
const loginData:any = reactive({
    username: '',
    pwd: ''
})
// 规则
const rules:any = {
    username: [{
        required: true,
        message: '请输入登录帐号',
        trigger: 'blur'
    }],
    pwd:[{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }]
}

        
// 渲染后加载
onMounted(()=>{
    console.log('mounted');
})
        
</script>
<style lang="less" scoped>
@import './index.less';
</style>