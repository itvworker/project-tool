<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            Picker
        </div>
        <div class="demo-main">
            <div class="link-item" @click="open">
                打开picker
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" >
                打开pickers
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" >
                方法
                <i class="icon-arrow rotate"></i>
            </div>
            <it-picker-time v-model="visible"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ItPickerTime from '../src/ItPickerTime.vue'
import '../style/ItPickerTime.scss'
import { ref, vShow } from 'vue'
const visible = ref<boolean>()
function open () {
    visible.value = true
}

</script>
<style lang="scss" scoped>
.item-demo {
    height: 50px;
    line-height: 50px;
    padding-left: 16px;
    border-bottom: #ddd solid 1px;
}
.header-domo{
    height: 30px;
    background-color: #eee;
    line-height: 30px;
    padding-left: 10px;
}

.box-width {
    background-color: #eee;
}
.picker-item {
    height: 44*5ipx;
    width: 100%;
    background-color: #fff;
}

</style>
