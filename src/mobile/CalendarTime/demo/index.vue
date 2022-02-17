<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            CalendarTime
        </div>
        <div class="demo-main">
            <div class="link-item" @click="open">
                打开picker
                <i class="icon-arrow rotate"></i>
            </div>

            <it-calendar-time v-model="visible" :start-week="1" default-value="2022-10-10 00:00">
                <template #day="scope">
                   <div class="active">{{scope.item.day}} {{scope.current}} </div>
                </template>
            </it-calendar-time>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ItCalendarTime from '../src/CalendarTime.vue'
import '../style/CalendarTime.scss'
const visible = ref<boolean>(false)
function open () {
    visible.value = true
}
</script>
<style lang="scss" scoped>
</style>
