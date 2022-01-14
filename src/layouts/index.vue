<template>
    <el-container class="root-box">
        <layout-menu />
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                 <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import { ElHeader, ElMain, ElFooter, ElContainer } from 'element-plus'
import LayoutMenu from '@/layouts/menu/index.vue'
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
