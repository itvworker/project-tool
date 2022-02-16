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

            <it-calendar-time v-model="visible"/>
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
