<template>
    <el-container>
        <el-aside width="200px">
            
        </el-aside>
        <el-container>
            -------
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import { ElScrollbar, ElContainer, ElAside } from 'element-plus';
import { withDefaults, defineProps, ref } from 'vue'
interface Item {
    path: string,
    label: string
}
interface Props {
    item: Item[],
}
withDefaults(defineProps<Props>(), {
    minDate: '1900-01-01',
    maxDate: '2200-01-01',
    value: formatDateMonent('', 'yyyy-MM'),
    disabled: function (value?:string):boolean {
        return false
    },
    startWeek: 1,
    weekText: () => ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    monthText: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
})
</script>
