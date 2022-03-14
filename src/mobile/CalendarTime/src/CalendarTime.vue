<template>
    <it-dialog v-model="visible" :dir="closeAminate"  @closed="onClosed">
        <div class="it-calendar-time">
            <div class="it-calendar-time-top" v-if="type==='calendar-time'">
                <div class="date" :class="{'active':dataType === 0}" @click="changeTab(0)">{{currentValue }}</div>
                <div class="time" :class="{'active':dataType === 1}" @click="changeTab(1)">{{currentHour}}:{{currentMin}}</div>
                <div class="btn-confirm" @click="confrimSelect">{{confirmText}}</div>
            </div>

            <div class="it-calendar-top" v-if="type==='calendar'">
                <div class="title">{{titleText}}</div>
                <div class="icon iconfont icon-failure1"></div>
                <!-- <div class="year-month">
                        {{nowMonth[15]?nowMonth[15].msg.substring(0,7):''}}
                </div> -->
            </div>
            <div class="it-calendar-top" v-if="type==='time'">
                <div class="it-calendar-cancel-btn"  @click="visible=false" >
                    {{cancelText}}
                </div>
                <div class="title">{{titleText}}</div>
                <div class="it-calendar-sure-btn" @click="confrimSelect">
                    {{confirmText}}
                </div>
            </div>
            <div class="it-calendar-time-change" :class="{'it-select-time': dataType===1 }">
                <div class="week-bar" v-if="type!=='time'">
                    <div class="week-item" v-for="(item, index) in weekTextArr" :key="index">{{item}}</div>
                </div>
                <it-swiper-mini ref="swiper" :bounce="false"
                    :direction="dir" @change="change"
                    :loop="false"
                    v-model="columnIndex"
                    class="it-swpier-calendar-time"
                    :class="{'it-calendar-only-time': type==='time'}"
                    :beginBounce="beginBounce"
                    :endBounce="endBounce"
                    :is-update="visible"
                    >
                    <it-swiper-mini-item class="it-swpier-calendar" v-for="(item, index) in calendarItems" :key="index">
                        <div class="day-item"
                            :class="{'day-active':currentValue === t.ymd,'prev-month': t.type==='prev', 'next-month': t.type==='next'}"
                            v-for="t in item"
                            :key="t.ymd"
                            @click="onSelectDay(index, t)"
                        >
                            <template v-if="$slots.day">
                                <slot name="day" v-bind="{item: t, selected: currentValue}"></slot>
                            </template>
                            <div v-if="!$slots.day" class="active">{{t.day}}</div>
                        </div>
                    </it-swiper-mini-item>
                </it-swiper-mini>
                <div class="it-picker-slot-box" :class="{'it-calendar-only-time': type==='time'}" v-if="type==='calendar-time'|| type==='time'">
                    <it-picker-slot :is-update="visible" :key-index="index" @chooseItem="chooseItem" :rows="7" :default-value="index===0? currentHour: currentMin" v-for="(item, index) in times" :key="index" :listData="item" />
                </div>
            </div>
        </div>
        <slot name="views" v-bind="{item:{day: 0}, selected: 'string'}"></slot>
    </it-dialog>
</template>
<script lang="ts" setup>
import { defineEmits, ref, defineProps, withDefaults, watch, getCurrentInstance, computed } from 'vue'
import type { VNodeChild } from 'vue'
import ItDialog from '../../Dialog/src/Dialog.vue'
import ItSwiperMini from '../../SwiperMini/src/SwiperMini.vue'
import ItSwiperMiniItem from '../../SwiperMini/src/SwiperMiniItem.vue'
import itPickerSlot from '../../Picker/src/PickerSlot.vue'
import type { SwiperMiniComponent } from '../../SwiperMini/src/SwiperMini'
import type { Calendars, OutCalendar } from '../../../libs/calendar'
import type { PickerSlotComponent, PickerSlotItem } from '../../Picker/src/Picker'
import { outCalendar } from '../../../libs/calendar'
import { formatDateMonent } from '../../../util'
const props = withDefaults(defineProps<{
    modelValue?: boolean,
    defaultValue?: string,
    minDate?: string,
    maxDate?: string,
    type?: string, // 插件模式， calendar-time , calendar
    weekText?: string[],
    confirmText?: string,
    titleText?: string,
    cancelText?: string,
    // 日历滑动方向  column竖向， row横向
    dir?: string,
    isVisible?: boolean,
    hideOnClick?: boolean,
    startWeek?: number,
    closeAminate?: string
    minStep?:number
}>(), {
    modelValue: false,
    defaultValue: formatDateMonent(new Date(), 'yyyy-MM-dd hh:mm'),
    minDate: formatDateMonent(new Date().getTime() - 365 * 24 * 60 * 60 * 1000 * 100, 'yyyy-MM-dd hh:mm'),
    maxDate: formatDateMonent(new Date().getTime() + 365 * 24 * 60 * 60 * 1000 * 100, 'yyyy-MM-dd hh:mm'),
    type: 'calendar-time',
    weekText: () => ['日', '一', '二', '三', '四', '五', '六'],
    confirmText: '确定',
    titleText: '请选择日期',
    cancelText: '取消',
    // 日历滑动方向  column竖向， row横向
    dir: 'column',
    isVisible: false,
    hideOnClick: true,
    startWeek: 0,
    closeAminate: 'bottom',
    minStep: 1
})
const emit = defineEmits(['update:modelValue', 'confirm', 'closed'])

const visible = ref<boolean>(false)
const dataType = ref<number>(0)
const currentValue = ref<string>(formatDateMonent(new Date(), 'yyyy-MM-dd'))
const currentHour = ref<string>(formatDateMonent(new Date(), 'hh')) // 当前小时
const currentMin = ref<string>(formatDateMonent(new Date(), 'mm')) // 当前选中的分
let currentDay = 0
let currentYear: string | number = 0
let currentMonth: string | number = 0
const app = getCurrentInstance()
const times = ref<PickerSlotItem[][]>([[], []])
const weekTextArr = computed(() => {
    if (props.startWeek === 0) {
        return props.weekText
    }
    const arr = JSON.parse(JSON.stringify(props.weekText))
    arr.push(arr.splice(0, 1)[0])
    return arr
})

watch(() => props.modelValue, (n) => {
    visible.value = n
})

watch(visible, (n) => {
    emit('update:modelValue', n)
    if (n) {
        outCalendarItems()
    }
})
watch(() => props.type, (n) => {
    if (n === 'time') {
        dataType.value = 1
    }

    if (n === 'calendar') {
        dataType.value = 0
    }
})

watch(() => props.defaultValue, (n) => {
    const arr = n.split(' ')
    currentValue.value = arr[0]
    if (props.type === 'calendar-time' || props.type === 'time') {
        const time = arr[1].split(':')
        currentHour.value = time[0]
        currentMin.value = time[1]
    }
})

function onClosed () {
    changeTab(0)
    emit('closed')
}
function changeTab (index: number) {
    if (index === dataType.value) {
        return
    }
    dataType.value = index
    if (app?.refs['picker-1']) {
        (app?.refs['picker-1'] as PickerSlotComponent).modifyStatus(true);
        (app?.refs['picker-0'] as PickerSlotComponent).modifyStatus(true)
    }
}

function confrimSelect () {
    if (props.type === 'time') {
        emit('confirm', `${currentHour.value}:${currentMin.value}`)
    } else {
        emit('confirm', `${currentValue.value} ${currentHour.value}:${currentMin.value}`)
    }
    emit('update:modelValue', false)
}

const calendarItems = ref<Calendars[][]>([[], [], []])
const columnIndex = ref<number>(1) // 日历滑动的索引
/**
 * 计算最小年月数字
 */
const calcMinDate = computed(() => {
    let arr = props.minDate.split(' ')
    const num = arr[0].replace('-', '')
    arr = num.split('-')
    return parseInt(arr[0])
})

/**
 * 计算最大年月数字
 */
const calcMaxDate = computed(() => {
    let arr = props.maxDate.split(' ')
    const num = arr[0].replace('-', '')
    arr = num.split('-')
    return parseInt(arr[0])
})
const beginBounce = computed(() => {
    const date = currentValue.value.split('-')
    const num = parseInt(`${date[0]}${date[1]}`)
    if (num <= calcMinDate.value) return true
    return false
})
/**
 * 是否到了最小月份
 */
const endBounce = computed(() => {
    const date = currentValue.value.split('-')
    const num = parseInt(`${date[0]}${date[1]}`)
    if (num >= calcMaxDate.value) return true
    return false
})

function outCalendarItems (index?: number | string) {
    let dates = props.defaultValue.split(' ')
    if (typeof index === 'undefined') {
        currentDay = parseInt(dates[0].split('-')[2])
    }
    const day30 = 24 * 60 * 60 * 1000 * 30 // 30天的时间
    // 切换为上一个月时
    if (index === 0 || index === 2) {
        const lastCalendar = calendarItems.value[index]
        let selectDay = ''
        for (let i = 0, l = lastCalendar.length; i < l; i++) {
            if (lastCalendar[i].type === 'current') {
                selectDay = lastCalendar[i].ymd
                if (lastCalendar[i].day === currentDay) {
                    break
                }
            }
        }
        dates = [selectDay, `${currentHour.value}:${currentMin.value}`]
    }
    currentValue.value = dates[0]
    currentHour.value = dates[1].split(':')[0]
    currentMin.value = dates[1].split(':')[1]
    const arr:string[] = currentValue.value.split('-')
    currentYear = arr[0]
    currentMonth = arr[1]
    const nextMonth = formatDateMonent(new Date(`${currentYear}/${currentMonth}/15`).getTime() + day30, 'yyyy,MM').split(',')
    const lastMonth = formatDateMonent(new Date(`${currentYear}/${currentMonth}/15`).getTime() - day30, 'yyyy,MM').split(',')
    calendarItems.value[0] = outCalendar({ year: parseInt(lastMonth[0]), startWeek: props.startWeek, month: parseInt(lastMonth[1]) })
    calendarItems.value[1] = outCalendar({ year: parseInt(currentYear), startWeek: props.startWeek, month: parseInt(currentMonth) })
    calendarItems.value[2] = outCalendar({ year: parseInt(nextMonth[0]), startWeek: props.startWeek, month: parseInt(nextMonth[1]) })
    outTime()
}

function becomeObj (i: number, type: string): PickerSlotItem {
    const value = i >= 10 ? i.toString() : `0${i}`
    const obj: PickerSlotItem = {
        value,
        label: value,
        disabled: false,
        type
    }
    return obj
}

function outTime () {
    outHour()
    outMin()
}
function outHour () {
    const item:PickerSlotItem[] = []
    // 是否等于开始年月日
    const isEqualStart = currentHour.value === props.minDate?.split(' ')[0]
    // 是否等结束年月日
    const isEqualEnd = currentHour.value === props.maxDate?.split(' ')[0]
    // 是否开始时间等结束时间
    const isEqualStartEnd = props.minDate?.split(' ')[0] === props.maxDate?.split(' ')[0]
    const startHour = parseInt(props.minDate.split(' ')[1].split(':')[0])
    const endHour = parseInt(props.maxDate.split(' ')[1].split(':')[0])
    if (isEqualStart && isEqualStartEnd) {
        for (let i = startHour; i <= endHour; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    if (isEqualStart && !isEqualStartEnd) {
        for (let i = startHour; i <= 23; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= endHour; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    if (!isEqualStart && !isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= 23; i++) {
            item.push(becomeObj(i, 'hour'))
        }
    }

    times.value[0] = item
}

function outMin () {
    const item:PickerSlotItem[] = []
    const startHour = props.minDate.split(' ')[1].split(':')
    const endHour = props.maxDate.split(' ')[1].split(':')
    const isEqualStart = currentHour.value === props.minDate?.split(' ')[0] && currentHour.value === startHour[0]
    // 是否等结束年月日
    const isEqualEnd = currentHour.value === props.maxDate?.split(' ')[0] && currentHour.value === endHour[0]
    // 是否开始时间等结束时间
    const isEqualStartEnd = props.minDate?.split(' ')[0] === props.maxDate?.split(' ')[0] && startHour[0] === endHour[0]

    if (isEqualStart && isEqualStartEnd) {
        for (let i = parseInt(startHour[1]); i <= parseInt(endHour[1]); i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    if (isEqualStart && !isEqualStartEnd) {
        for (let i = parseInt(startHour[1]); i <= 59; i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    if (isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= parseInt(endHour[1]); i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    if (!isEqualStart && !isEqualEnd && !isEqualStartEnd) {
        for (let i = 0; i <= 59; i += props.minStep) {
            item.push(becomeObj(i, 'min'))
        }
    }

    times.value[1] = item
}
function onSelectDay (index:number, item: Calendars) {
    if (index !== 1) return
    if (item.disabled) return
    currentDay = item.day
    if (item.type === 'current') {
        currentValue.value = item.ymd
    }
    if (item.type === 'next') {
        (app?.refs.swiper as SwiperMiniComponent).scrollTo(2, true)
    }
    if (item.type === 'prev') {
        (app?.refs.swiper as SwiperMiniComponent).scrollTo(0, true)
    }
}
function change (index: number) {
    if (index === 1) return
    outCalendarItems(index);
    (app?.refs.swiper as SwiperMiniComponent).scrollTo(1, false)
}

function chooseItem (item: PickerSlotItem, index:number) {
    if (index === 0) {
        currentHour.value = item.value.toString()
    }

    if (index === 1) {
        currentMin.value = item.value.toString()
    }
}

</script>
