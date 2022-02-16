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

            <div class="link-item"  @click="open1">
                设定开始时间 结束时间
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item"  @click="open2">
                年月日时间
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item"  @click="open3">
                时间
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" @click="fnSelected" >
                方法
                <div class="link-item-text">
                    {{defaultValueFn}}
                </div>
                <i class="icon-arrow rotate"></i>
            </div>
            <it-picker-time v-model="visible"/>
            <it-picker-time v-model="visible1" start-date="2021-11-12" end-date="2031-11-16"/>
            <it-picker-time v-model="visible2" type="ymdtime" start-date="2021-11-12 12:16" end-date="2031-11-16 23:59"/>
            <it-picker-time v-model="visible3" @selected="selected" defaultValue="12:00" type="time" start-date="06:16" end-date="23:59" :min-step="5"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ItPickerTime from '../src/PickerTime.vue'
import pickerTime from '../src/PickerTime.method'
import '../style/PickerTime.scss'
import { ref, vShow } from 'vue'
const visible = ref<boolean>(false) 
const visible1 = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const visible3 = ref<boolean>(false)
const defaultValueFn = ref<string>('')
function open () {
    visible.value = true
}

function open1 () {
    visible1.value = true
}

function open2 () {
    visible2.value = true
}

function open3 () {
    visible3.value = true
}

function selected (value: string) {
    console.log(value);
}

function fnSelected () {
    pickerTime({
        format: 'yyyy-MM-dd',
        defaultValue: defaultValueFn.value,
        onSelected (value:string) {
            defaultValueFn.value = value
        }
    })
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
