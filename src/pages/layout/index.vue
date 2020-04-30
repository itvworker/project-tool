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
                active-text-color="#ffd04b">
                
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
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