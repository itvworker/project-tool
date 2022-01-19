<template>
    <el-container class="root-box">
        <el-header><layout-menu /></el-header>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { ElHeader, ElMain, ElFooter, ElContainer } from 'element-plus'
import LayoutMenu from '@/layouts/menu/index.vue'
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
