import { ElButton, ElContainer, ElForm, ElFormItem, ElInput, ElLink } from 'element-plus'
import { defineComponent, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import './index.less';
export default defineComponent({
    setup() {
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
                message: '请输入入密码',
                trigger: 'blur'
            }]
        }
        
        
        let name:string= '';
        const onInputUsername = (value: string):void => {
            loginData[name] = value;
        }
        const onFocus = (e: any):void =>{
            name = e.target.dataset.key;
        }


        // 渲染后加载
        onMounted(()=>{})
        return ()=>{
            return ( 
                <>
                    <ElContainer  
                        class="el-login-root"
                    >
                        <div class="el-login-box">
                            <ElForm
                                model={loginData}
                                rules={rules}
                            >
                                <ElFormItem
                                    prop="username"
                                >
                                    <ElInput  
                                    modelValue = {loginData.username}  
                                    onInput = {onInputUsername}
                                    onFocus = {onFocus}
                                    placeholder={t('pleaseInput')}
                                    data-key="username"
                                     />
                                </ElFormItem>

                                <ElFormItem
                                    prop="username"
                                >
                                    <ElInput  
                                    modelValue = {loginData.pwd}  
                                    onInput = {onInputUsername}
                                    onFocus = {onFocus}
                                    placeholder={t('pleaseInput')}
                                    type="password"
                                    data-key="pwd"
                                     />
                                </ElFormItem>

                                <div class="login-link-bar">
                                    <ElLink class="link" type="primary">忘记密码</ElLink>
                                </div>
                                <ElButton  class="el-login-btn" type="primary">登录</ElButton>
                            </ElForm>
                        </div>
                    </ElContainer>
                </>
            )
        }
    }
})