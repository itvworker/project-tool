<template>
        <el-menu
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            :default-active="active"
            mode="horizontal"
            class="el-meun-bar"
        >

            <li class="meunt-left">
                <div class="logo">
                    ITV
                </div>
            </li>
            <el-children v-for="(item, index) in items" :key="index"  :index="index+''" :item="item" />
        </el-menu>
</template>
<script lang="ts" setup>
import { ElMenu } from 'element-plus'
import ElChildren from './el-children.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import data from './data'
import { ref, watch } from 'vue'
const isCollapse = ref(false)
const items = ref(data)
const handleClose = (value: string) => {
    console.log(value)
}
const handleOpen = (value: string) => {
    console.log(value)
}

// 路由有关的逻辑
function initMeunActive (path: string): void{
    let current = '0'
    for (let i = 0, l = data.length; i < l; i++) {
        if (data[i].path === path) {
            current = i.toString()
            break
        }
    }
    active.value = current;
}
const active = ref('0')
const $route = useRoute()
watch($route, (current) => {
    initMeunActive(current.path)
})
initMeunActive($route.path);

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
