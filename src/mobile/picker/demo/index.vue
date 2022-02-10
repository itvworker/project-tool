<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            Picker
        </div>
        <div class="demo-main">
            <div class="picker-item">
                <picker-slot
                :default-value="4"
                :is-update="isUpdate"
                :list-data="listData"
                @chooseItem="chooseItem"
                :key="0"
                :key-index="0"
                :lastChange="lastChange"
                :isLoop="true"
                :output="output"
            ></picker-slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import PickerSlot from '../src/picker-slot.vue'
import '../style/picker-slot.scss'
const listData = [
    {
        label: '1月',
        value: 1
    },
    {
        label: '2月',
        value: 2
    },
    {
        label: '3月',
        value: 3
    },
    {
        label: '4月',
        value: 4
    },
    {
        label: '5月',
        value: 5
    },
    {
        label: '6月',
        value: 6
    },
    {
        label: '7月',
        value: 7
    }
]
const isUpdate = true
const lastChange = true

function chooseItem () {
    console.log('-----')
}
function output(item: any) {
    return item.label
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
}

</style>
