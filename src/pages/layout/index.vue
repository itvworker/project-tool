<template>
    <el-container style="height: 100%;" class="layout-page">
        <el-aside style="width:200px" class="meun">
            <div class="header-logo">
                    logo    
            </div> 
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#011829"
                text-color="#fff"
                :router="true"
                active-text-color="#ffd04b">
                
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">统计分析</span>
                </el-menu-item>
                <el-menu-item index="2" >
                    <i class="el-icon-unlock"></i>
                    <span slot="title">权限设置</span>
                </el-menu-item>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">备份数据库</el-menu-item>
                        <el-menu-item index="3-2">小程序设置</el-menu-item>
                        <el-menu-item index="3-3">轮播图</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="/school">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">学校管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/school/index">学校列表</el-menu-item>
                        <el-menu-item index="/school/grade">班级管理</el-menu-item>
                        <el-menu-item index="/school/students">学生管理</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>

                </el-menu>


        </el-aside>
        <el-container style="height: 100%; ">
            <el-header style="height:60px" class="header">
                 
            </el-header>
            <router-view />
        </el-container>
    </el-container>
</template>

<script>
export default {
    methods: {
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
</style>