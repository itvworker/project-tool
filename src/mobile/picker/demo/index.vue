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

            <div class="link-item" @click="open1">
                打开pickers
                <i class="icon-arrow rotate"></i>
            </div>
            <it-dialog v-model="visible" dir="bottom">
                <div class="picker-item">
                    <picker-slot
                    :default-value="4"
                    :is-update="visible"
                    :list-data="listData"
                    @chooseItem="chooseItem"
                    :key="0"
                    :key-index="0"
                    :lastChange="lastChange"
                    :isLoop="true"
                    :output="output"
                ></picker-slot>
                </div>
            </it-dialog>
            <it-picker v-model="visible1" :items="pickers"></it-picker>
        </div>
    </div>
</template>
<script lang="ts" setup>
import PickerSlot from '../src/picker-slot.vue'
import ItDialog from '@/mobile/dialog/src/ItDialog.vue';
import ItPicker from '../src/picker.vue'
import '@/mobile/dialog/style/index.scss'
import '../style/picker-slot.scss'
import '../style/picker.scss'
import { ref } from 'vue'
const visible = ref<boolean>(false)
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

const days = [
    {
        label: '1日',
        value: 1
    },
    {
        label: '2日',
        value: 2
    },
    {
        label: '3日',
        value: 3
    },
    {
        label: '4日',
        value: 4
    },
    {
        label: '5日',
        value: 5
    },
    {
        label: '6日',
        value: 6
    },
    {
        label: '7日',
        value: 7
    }
]


const isUpdate = true
const lastChange = true

function chooseItem () {
    console.log('-----')
}
function output (item: any) {
    return item.label+'webs---'
}

function open () {
    visible.value = true;
}

const visible1 = ref<boolean>(false)
const pickers = [listData, days]
function open1() {
    visible1.value = true
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
