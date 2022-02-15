<template>
    <it-picker v-model="visible" ref="pickerCom" :items="items" :default-value="defaultValueArr" @chooseItem="onChooseItem"></it-picker>
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineProps, withDefaults, watch, nextTick } from 'vue'
import ItPicker from '../../Picker/src/Picker.vue'
import { PickerTimeProps } from './type'
import { formatDateMonent } from '../../../util'
import type { PickerItems, SlotItem } from '../../Picker/src/type'
const visible = ref<boolean>(false)
const emit = defineEmits(['update:modelValue'])
const pickerCom = ref()
const props = withDefaults(defineProps<{
    defaultValue?:string,
    type?: string
    modelValue?: boolean,
    startDate?: string,
    endDate?: string,
    disableOption?:(value: SlotItem) => boolean
}>(), {
    defaultValue: formatDateMonent(new Date(), 'yyyy-MM-dd'),
    modelValue: false,
    type: 'ymd', // ymd 为年月日 ymdtime 为年月日时分 time 为24小时 time12 为12小时制，分上午下午
    startDate: '1900-01-01 00:00',
    endDate: '2200-12-31 23:59',
    disableOption: (value: SlotItem) => {
        return false
    }
})

watch(() => props.modelValue, (n) => {
    if (visible.value !== n) {
        visible.value = n
    }
})
watch(visible, (n) => {
    emit('update:modelValue', n)
    if (n) {
        init()
    }
})
const items = ref<PickerItems>([])
let startDateArr: number[] = []
let endDateArr: number[] = []
const defaultValueArr = ref<string[]>([])
let selected:string[] = []
function init () {
    selected = props.defaultValue.replace(/(-|\s|:)/ig, '/').split('/')
    startDateArr = props.startDate.replace(/(-|\s|:)/ig, '/').split('/').map((item:string) => parseInt(item))
    endDateArr = props.endDate.replace(/(-|\s|:)/ig, '/').split('/').map((item:string) => parseInt(item))
    switch (props.type) {
    case 'ymd':
        outYear()
        outMonth()
        outDay()
        break
    case 'ymdtime':
        outYear()
        outMonth()
        outDay()
        break
    default:
        break
    }
    nextTick(() => {
        defaultValueArr.value = selected.map((item:string) => item)
    })
}
/** */
function getDays(year: number, month: number):number {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year % 4 === 0 && month === 2) {
        return 28
    }
    return months[month - 1]
}

function becomeObj (i: number, type: string):SlotItem {
    const value = i >= 10 ? i.toString() : `0${i}`
    const obj: SlotItem = {
        value,
        label: value,
        disabled: false,
        type
    }
    obj.disabled = props.disableOption(obj)
    return obj
}
/**
 * 生成年的数组
 */
function outYear () {
    const item:SlotItem[] = []
    for (let i = startDateArr[0]; i <= endDateArr[0]; i++) {
        item.push(becomeObj(i, 'year'))
    }
    items.value[0] = item
}

/**
 * 生成月
 */
function outMonth () {
    const item:SlotItem[] = []
    /**
     * 当前选中年等于开始年 并且开始年等结束年
     */
    if (startDateArr[0].toString() === selected[0] && startDateArr[0] === endDateArr[0]) {
        for (let i = startDateArr[1]; i <= endDateArr[1]; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }
    /**
     * 当前
     */
    if (startDateArr[0].toString() === selected[0] && startDateArr[0] !== endDateArr[0]) {
        for (let i = startDateArr[1]; i <= 12; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }

    if (endDateArr[0].toString() === selected[0] && startDateArr[0] !== endDateArr[0]) {
        for (let i = 1; i <= endDateArr[1]; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }

    if (startDateArr[0].toString() !== selected[0] && endDateArr[0].toString() !== selected[0] && startDateArr[0] !== endDateArr[0]) {
        for (let i = 1; i <= 12; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }
    items.value[1] = item
}

function outDay () {
    const item:SlotItem[] = []
    // 是否等于开始年月
    const isEqualStart = startDateArr[0].toString() === selected[0] && startDateArr[1].toString() === selected[1]
    // 是否等结束年月
    const isEqualEnd = endDateArr[0].toString() === selected[0] && startDateArr[1].toString() === selected[1]
    // 是否开始时间等结束时间
    const isEqualStartEnd = startDateArr[0] === endDateArr[0] && startDateArr[1] === endDateArr[1]

    if (isEqualStart && isEqualStartEnd) {
        for (let i = startDateArr[2]; i <= endDateArr[2]; i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    if (isEqualStart && !isEqualStartEnd) {
        for (let i = startDateArr[2]; i <= getDays(parseInt(selected[0]), parseInt(selected[1])); i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 1; i <= endDateArr[2]; i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    if (!isEqualStart && !isEqualEnd) {
        for (let i = 1; i <= getDays(parseInt(selected[0]), parseInt(selected[1])); i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    items.value[2] = item
}

function onChooseItem (value: SlotItem, keyIndex: number) {
    selected[keyIndex] = value.value.toString()
    if (value.type === 'year' && (props.type === 'ymd' || props.type === 'ymdtime')) {
        outMonth()
    }

    if (value.type === 'month' && (props.type === 'ymd' || props.type === 'ymdtime')) {
        outDay()
    }
    defaultValueArr.value[keyIndex] = value.value.toString()
}

</script>
