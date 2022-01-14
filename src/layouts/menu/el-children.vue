<template>
    <!-- 如果只是菜单项目  -->
    <el-sub-menu v-if="item.type==='menu'" :index="index" >
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
    <router-link  :to="item.path"  v-if="item.type==='link'">
        <el-menu-item :index="index" > {{item.label}}</el-menu-item>
    </router-link>
</template>
<script lang="ts" setup>
import { ElSubMenu, ElMenuItem } from 'element-plus'
import { defineProps } from 'vue'

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
const props = defineProps<Props>()

console.log(props.index)

</script>