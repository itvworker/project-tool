<template>
    <it-picker v-model="visible" ref="pickerCom" :items="items" :loop="loop" @selected="onSelected" :default-value="defaultValueArr" @chooseItem="onChooseItem"></it-picker>
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineProps, withDefaults, watch, nextTick } from 'vue'
import ItPicker from '../../Picker/src/Picker.vue'
import { formatDateMonent } from '../../../util'
import type { PickerItems, PickerSlotItem } from '../../Picker/src/type'
const visible = ref<boolean>(false)
const emit = defineEmits(['update:modelValue', 'selected'])
const pickerCom = ref()
const props = withDefaults(defineProps<{
    defaultValue?:string,
    type?: string
    modelValue?: boolean,
    minDate?: string,
    maxDate?: string,
    disableOption?:(value: PickerSlotItem) => boolean,
    loop?: boolean,
    minStep?: number,
    format?:string | null
}>(), {
    defaultValue: formatDateMonent(new Date(), 'yyyy-MM-dd hh:mm'),
    modelValue: false,
    type: 'ymd', // ymd 为年月日 ymdtime 为年月日时分 time 为24小时 time12 为12小时制，分上午下午
    minDate: formatDateMonent(new Date().getTime() - 365 * 24 * 60 * 60 * 1000 * 10, 'yyyy-MM-dd hh:mm'),
    maxDate: formatDateMonent(new Date().getTime() + 365 * 24 * 60 * 60 * 1000 * 10, 'yyyy-MM-dd hh:mm'),
    loop: false,
    minStep: 1,
    format: null,
    disableOption: () => {
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
let minDateArr: number[] = []
let maxDateArr: number[] = []
const defaultValueArr = ref<string[]>([])
let selected:string[] = []
let yearIndex = 0 // 年索引
let monthIndex = 1 // 月索引
let dayIndex = 2 // 日索引
let hourIndex = 3 // 时索引
let minIndex = 4 // 分钟索引
function init () {
    selected = props.defaultValue.replace(/(-|\s|:)/ig, '/').split('/')
    minDateArr = props.minDate.replace(/(-|\s|:)/ig, '/').split('/').map((item:string) => parseInt(item))
    maxDateArr = props.maxDate.replace(/(-|\s|:)/ig, '/').split('/').map((item:string) => parseInt(item))
    const date = formatDateMonent(new Date(), 'yyyy-MM-dd')
    const dateArr = date.split('-')
    switch (props.type) {
    case 'ymd':
        yearIndex = 0 // 年索引
        monthIndex = 1 // 月索引
        dayIndex = 2 // 日索引
        outYear()
        outMonth()
        outDay()
        break
    case 'ymdtime':
        yearIndex = 0 // 年索引
        monthIndex = 1 // 月索引
        dayIndex = 2 // 日索引
        hourIndex = 3 // 时索引
        minIndex = 4 // 分钟索引
        outYear()
        outMonth()
        outDay()
        outHour()
        break
    case 'time':
        if (selected.length === 2) {
            selected = dateArr.concat(selected)
        }
        if (minDateArr.length === 2) {
            minDateArr = dateArr.map((item:string) => parseInt(item)).concat(minDateArr)
        }

        if (maxDateArr.length === 2) {
            maxDateArr = dateArr.map((item:string) => parseInt(item)).concat(maxDateArr)
        }
        hourIndex = 0 // 时索引
        minIndex = 1 // 分钟索引
        outHour()
        outMin()
        break
    default:
        break
    }
    nextTick(() => {
        defaultValueArr.value = selected.map((item:string) => item)
    })
}
/** */
function getDays (year: number, month: number):number {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year % 4 === 0 && month === 2) {
        return 28
    }
    return months[month - 1]
}

function becomeObj (i: number, type: string):PickerSlotItem {
    const value = i >= 10 ? i.toString() : `0${i}`
    const obj: PickerSlotItem = {
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
    const item:PickerSlotItem[] = []
    for (let i = minDateArr[0]; i <= maxDateArr[0]; i++) {
        item.push(becomeObj(i, 'year'))
    }
    items.value[yearIndex] = item
}

/**
 * 生成月
 */
function outMonth () {
    const item:PickerSlotItem[] = []
    const _selected = selected.map((item:string) => parseInt(item))
    // 是否等于开始年月
    const isEqualStart = minDateArr[0] === _selected[0]
    // 是否等结束年
    const isEqualEnd = maxDateArr[0] === _selected[0]
    // 是否开始时间等结束时间
    const isEqualStartEnd = minDateArr[0] === maxDateArr[0]
    /**
     * 当前选中年等于开始年 并且开始年等结束年
     */
    if (isEqualStart && isEqualStartEnd) {
        for (let i = minDateArr[1]; i <= maxDateArr[1]; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }
    /**
     * 当前
     */
    if (isEqualStart && !isEqualStartEnd) {
        for (let i = minDateArr[1]; i <= 12; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 1; i <= maxDateArr[1]; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }

    if (!isEqualStart && !isEqualEnd && !isEqualStartEnd) {
        for (let i = 1; i <= 12; i++) {
            item.push(becomeObj(i, 'month'))
        }
    }
    items.value[monthIndex] = item
}

function outDay () {
    const item:PickerSlotItem[] = []
    const _selected = selected.map((item:string) => parseInt(item))
    // 是否等于开始年月
    const isEqualStart = minDateArr[0] === _selected[0] && minDateArr[1] === _selected[1]
    // 是否等结束年月
    const isEqualEnd = maxDateArr[0] === _selected[0] && minDateArr[1] === _selected[1]
    // 是否开始时间等结束时间
    const isEqualStartEnd = minDateArr[0] === maxDateArr[0] && minDateArr[1] === maxDateArr[1]

    if (isEqualStart && isEqualStartEnd) {
        for (let i = minDateArr[2]; i <= maxDateArr[2]; i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    if (isEqualStart && !isEqualStartEnd) {
        for (let i = minDateArr[2]; i <= getDays(parseInt(selected[0]), parseInt(selected[1])); i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 1; i <= maxDateArr[2]; i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    if (!isEqualStart && !isEqualEnd) {
        for (let i = 1; i <= getDays(parseInt(selected[0]), parseInt(selected[1])); i++) {
            item.push(becomeObj(i, 'day'))
        }
    }

    items.value[dayIndex] = item
}

function outHour () {
    const item:PickerSlotItem[] = []
    const _selected = selected.map((item:string) => parseInt(item))
    // 是否等于开始年月日
    const isEqualStart = minDateArr[0] === _selected[0] && minDateArr[1] === _selected[1] && minDateArr[2] === _selected[2]
    // 是否等结束年月日
    const isEqualEnd = maxDateArr[0] === _selected[0] && minDateArr[1] === _selected[1] && minDateArr[2] === _selected[2]
    // 是否开始时间等结束时间
    const isEqualStartEnd = minDateArr[0] === maxDateArr[0] && minDateArr[1] === maxDateArr[1] && minDateArr[2] === maxDateArr[2]
    if (isEqualStart && isEqualStartEnd) {
        for (let i = minDateArr[3]; i <= maxDateArr[3]; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    if (isEqualStart && !isEqualStartEnd) {
        for (let i = minDateArr[3]; i <= 23; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= maxDateArr[3]; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    if (!isEqualStart && !isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= 23; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    items.value[hourIndex] = item
}

function outMin () {
    const item:PickerSlotItem[] = []
    const _selected = selected.map((item:string) => parseInt(item))
    // 是否等于开始年月日
    const isEqualStart = minDateArr[0] === _selected[0] && minDateArr[1] === _selected[1] && minDateArr[2] === _selected[2] && minDateArr[3] === _selected[3]
    // 是否等结束年月日
    const isEqualEnd = minDateArr[0] === _selected[0] && minDateArr[1] === _selected[1] && minDateArr[2] === _selected[2] && minDateArr[3] === _selected[3]
    // 是否开始时间等结束时间
    const isEqualStartEnd = minDateArr[0] === maxDateArr[0] && minDateArr[1] === maxDateArr[1] && minDateArr[2] === maxDateArr[2] && minDateArr[3] === maxDateArr[3]

    if (isEqualStart && isEqualStartEnd) {
        for (let i = minDateArr[4]; i <= maxDateArr[4]; i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    if (isEqualStart && !isEqualStartEnd) {
        for (let i = minDateArr[4]; i <= 59; i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= maxDateArr[4]; i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    if (!isEqualStart && !isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= 59; i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    items.value[minIndex] = item
}

function onSelected (items:PickerSlotItem[]) {
    let _format: string = props.format || 'yyyy-MM-dd hh:mm'
    switch (props.type) {
    case 'ymdtime':
    case 'ymd':
        items.forEach((item: any, index: number) => {
            switch (index) {
            case 1:
                _format = _format?.replace('MM', item.value || 'MM')
                break
            case 2:
                _format = _format?.replace('dd', item.value || 'dd')
                break
            case 3:
                _format = _format?.replace('hh', item.value || 'hh')
                break
            case 4:
                _format = _format?.replace('mm', item.value || 'mm')
                break
            default:
                _format = _format?.replace('yyyy', item.value || 'yyyy')
                break
            }
        })
        break
    default:
        items.forEach((item: any, index: number) => {
            switch (index) {
            case 1:
                _format = _format?.replace('mm', item.value)
                break
            default:
                _format = _format?.replace('hh', item.value)
                break
            }
        })
        break
    }
    _format = _format?.replace('yyyy-MM-dd', '').replace('hh:mm', '').replace(/(^\s*)|(\s*$)/g, '')
    emit('selected', _format)
}
function onChooseItem (value: PickerSlotItem, keyIndex: number) {
    selected[keyIndex] = value.value.toString()
    if (value.type === 'year' && (props.type === 'ymd' || props.type === 'ymdtime')) {
        outMonth()
    }

    if (value.type === 'month' && (props.type === 'ymd' || props.type === 'ymdtime')) {
        outDay()
    }

    if (value.type === 'day' && props.type === 'ymdtime') {
        outHour()
    }

    if (value.type === 'hour' && props.type === 'ymdtime') {
        outMin()
    }
    defaultValueArr.value[keyIndex] = value.value.toString()
}

</script>
