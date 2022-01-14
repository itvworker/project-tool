<template>
    <el-aside width="auto" class="layout-left">
        <div class="logo">
            管理系统
        </div>
        <el-scrollbar class="el-scrollbar">
            <el-menu
                class="el-menu-vertical"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#fff"
                :default-active="0"
            >
                <el-children v-for="(item, index) in items" :key="index"  :index="index+''" :item="item" />
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>
<script lang="ts" setup>
import { ElAside, ElMenu, ElScrollbar } from 'element-plus'
import ElChildren from './el-children.vue'
import data from './data'
import { ref } from 'vue'
const isCollapse = ref(false)
const items = ref(data)
const handleClose = (value: string) => {
    console.log(value)
}

const handleOpen = (value: string) => {
    console.log(value)
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
