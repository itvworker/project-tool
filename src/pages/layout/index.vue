<template>
    <el-container style="height: 100%;" class="layout-page">
        <el-aside style="width:200px" class="meun">
            <div class="header-logo">
                    logo    
            </div> 
            <el-menu
                :default-active="active"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#011829"
                text-color="#fff"
                :router="true"
                active-text-color="#ffd04b">
                
                <el-menu-item index="/index">
                    <i class="el-icon-menu"></i>
                    <span slot="title">统计分析</span>
                </el-menu-item>
                <!-- <el-menu-item index="2" >
                    <i class="el-icon-unlock"></i>
                    <span slot="title">权限设置</span>
                </el-menu-item> -->

                <!-- <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">备份数据库</el-menu-item>
                        <el-menu-item index="3-2">小程序设置</el-menu-item>
                        <el-menu-item index="3-3">轮播图</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
                
                <el-submenu index="/school">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">学校管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/school/index">学校列表</el-menu-item>
                        <el-menu-item index="/school/grade">年级管理</el-menu-item>
                        <el-menu-item index="/school/students">学生管理</el-menu-item>
                        <el-menu-item index="/school/clock">打卡记录</el-menu-item>
                        <el-menu-item index="/school/paper">健康日报</el-menu-item>
                         <el-menu-item index="/school/teacher">老师管理</el-menu-item>
                        <el-menu-item index="/school/guard">门卫管理</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>

                </el-menu>


        </el-aside>
        <el-container style="height: 100%; ">
            

            <el-header style="height:60px" class="header">
                <el-select  style="width: 300px" 
                            v-model="one.id"
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择"
                            @change="changeOne"                            

                             >
                    <el-option
                            v-for="item in multiple"
                            :key="item.id"
                            :label="item.school_name"
                            :value="item.id">
                    </el-option>
                </el-select>
              


                 <el-dropdown @command="handleCommand" class="user-heder">
                    <span class="el-dropdown-link">
                        {{$store.state.user.username}}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">修改密码</el-dropdown-item>
                        <el-dropdown-item command="b">退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-header>
            <router-view />
        </el-container>

        

        <el-dialog title="修改密码" :modal="true"
                   :visible.sync="show" width="400px" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="old_password">
                    <el-input v-model="form.old_password" type="password"></el-input>
                </el-form-item>
                 <el-form-item label="新密码" prop="new_password">
                    <el-input v-model="form.new_password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="again_password">
                    <el-input v-model="form.again_password" type="password"></el-input>
                </el-form-item>

                <el-form-item class="btn-bar">
                    <el-button class="btn-submit" :loading="loading" type="primary" @click="submit">提交
                    </el-button>
                    <el-button class="btn-cancel" @click="show=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        
        
    </el-container>
</template>

<script>
import {setSession} from "../../libs/tool";
import config from '@/config'
import {mapState} from 'vuex'
import base from '@/mixins/page.base'


export default {
    mixins:[
        base
    ],
    watch: {

    },
    data() {
            var validatePass = (rule, value, callback) => {
            if (value.length<6) {
                callback(new Error('请输入6-16位字符的密码'));
            } else {
            if (this.form.again_password !== '') {
              
                this.$refs.form.validateField('again_password');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            console.log(value);
            
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.form.new_password) {
                console.log(value);
                console.log(this.form.new_password);
                
                callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            active: "1",
            show: false,
            loading: false,
            selectedId: '' ,
            rules: {
                old_password: [
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' } 
                ],
                new_password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                again_password: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            form: {
                old_password: '',
                new_password: '',
                again_password: ''
            },
           
        }

        
    },
     computed: {
        ...mapState(['multiple','one'])
    },
    mounted() {
        
        this.calcActive()
    },
    watch: {
        $route(n,o) {
            this.active = this.$route.path
            
        }
    },
    methods: {
        changeOne(e) {
       
            for(let i = 0; i < this.multiple.length;i++ ) {
               
                if(e==this.multiple[i].id) {
                    setSession('one', this.multiple[i]);
                    this.$store.commit('SET_NODE', {
                        one: this.multiple[i]
                    })
                    window.location.reload();
                    break;
                }

            }
          
        },
        submit() {
            this.$refs.form.validate(async (valid) => {
                if(!valid) return;
                try {
                  this.loading = true;
                  let res =  await this.$model.user.resetPwd(this.form);
                  

                   if(res) {
                       
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.show = false;
                   }else{
                       this.$message({
                            message: '旧密码错误',
                            type: 'error'
                        });
                   }
                     
                } catch (error) {
                   
                      
                      this.$message({
                            message: '修改失败',
                             type: 'error'
                        });
                }
                this.loading = false;
                
            })
        },
        calcActive() {
            if(this.$route.path.indexOf('school')>-1) {
                this.active = this.$route.path
                console.log(this.$route.fullPath);
            }
        },
        handleCommand(e) {
            if(e==='a') {
                this.form = {
                    old_password: '',
                    new_password: '',
                    again_password: ''
                };
                setTimeout(()=>{
                    this.$refs.form.resetFields()
                })
                
                
                this.show = true;
                return
            }

            this.$store.commit('SET_USER', '');
            setSession(config.userKey, '');
            setSession('multiple', '');
            setSession('one', '');
            this.$router.push({
                name:'login'
            })

        },
        handleOpen() {
        },
        handleClose() {
            
        }
    }
}
</script>
<style lang="less" scoped>
.meun {

    background: #011829;
   
}
 .layout-page{
        // background:url('~@/assets/images/bg.png');
        // background-color: rgba(255, 255, 255, 0.2);
        background-size: cover;
    }
.header{
    background-color: #fff;
    border-bottom: #ddd solid 1px;
}
.user-heder{
    float: right;
}
</style>