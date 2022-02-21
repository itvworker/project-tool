<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            Picker
        </div>
        <div class="demo-main">
            <div class="link-item" @click="open1">
                打开picker
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" @click="open2">
                方法
                <i class="icon-arrow rotate"></i>
            </div>
            <it-picker v-model="visible1" :items="pickers" @chooseItem="chooseItem" @selected="onSelected">
                <template #default="scope">
                    {{scope.value}}
                </template>
            </it-picker>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ItPicker from '../src/Picker.vue'
import '../style/Picker.scss'
import { ref } from 'vue'
import picker from '../src/Picker.method'
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

const minutes = [
    {
        label: '1时',
        value: 1
    },
    {
        label: '2时',
        value: 2
    },
    {
        label: '3时',
        value: 3
    },
    {
        label: '4时',
        value: 4
    },
    {
        label: '5时',
        value: 5
    },
    {
        label: '6时',
        value: 6
    },
    {
        label: '7时',
        value: 7
    }
]

const isUpdate = true
const lastChange = true
const visible1 = ref<boolean>(false)
const pickers = ref<any[]>([listData, days])
const pickers2 = ref<any[]>([listData, minutes])
function chooseItem (list:any, keyIndex: number) {
    console.log(list);
    if (list.value === 3) {
        pickers.value[1] = minutes
    }
}
function output (item: any) {
    return item.label+'webs---'
}

function open () {
    visible.value = true;
}

function open1 () {
    visible1.value = true
}

function open2 () {
    picker({
        items: pickers2.value
    })
}

function onSelected (value: any) {
    console.log(value);
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
