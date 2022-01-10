<template>
    <!-- 如果只是菜单项目  -->
    <el-sub-menu v-if="item.type==='menu'" :index="index">
        <router-link v-if="item.path" :to="item.path">
            {{item.label}}
        </router-link>
        <template v-if="!item.path" #title>
            <span>{{item.label}}</span>
        </template>
        
        <template v-if="item.children">
            <el-children v-for="(t, i) in item.children" :key="index+'-'+i" :index="index+'-'+i" :item="t"></el-children>
        </template>
    </el-sub-menu>
    <!-- 如果是链接  -->
    <el-menu-item :index="index" v-if="item.type==='link'">
        <router-link  :to="item.path">
            {{item.label}} 
        </router-link>
    </el-menu-item>
    
</template>
<script lang="ts" setup>
import { ElSubMenu } from 'element-plus';
import {defineProps } from 'vue'

interface Item {
    type: string,
    label: string,
    icon?: string,
    path?: string,
    children?: Item[]
}

interface Props {
    index: string,
    item: Item
}
const props = defineProps<Props>();

console.log(props.index);

</script>