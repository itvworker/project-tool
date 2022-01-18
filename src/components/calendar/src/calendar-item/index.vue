<template>
    <div class="it-calendar-item" :class="{'it-calendar-not-current': item.type !== 'current'}">
        <slot :data="item"> {{item.day}}</slot>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { Calendars } from '../lib/type'
// 月份所处的每一天
interface Props {
    item?: Calendars, // 最大日期 精确到天
    minDate?: string, // 最小日期 精期到日
    current?: string, // 当前年月
    disabled?: (value:string)=> boolean // 生成日历时是否禁止
}
defineProps<Props>()

</script>
