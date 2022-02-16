<template>
    <it-dialog v-model="visible" :dir="closeAminate" :hideOnClick="hideOnClick">>
        <div class="it-calendar-time" @click.stop="">
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
                    @last="change(2)" @first="change(0)"
                    :loop="false"
                    v-model="columnIndex"
                    class="it-swpier-calendar-time"
                    :class="{'it-calendar-only-time': type==='time'}"
                    :beginBounce="beginBounce"
                    :endBounce="endBounce"
                    >
                    <it-swiper-mini-item class="it-swpier-calendar">
                        <div class="month-number" v-if="!beginBounce">
                            <div class="year">
                                {{prevMonth[15]?prevMonth[15].year:''}}
                            </div>
                            <div class="month">
                                {{prevMonth[15]?prevMonth[15].month:''}}
                            </div>
                        </div>

                        <div class="month-number">
                        </div>
                        <div v-if="!beginBounce"
                            class="day-item"
                            @click="selectDay(index, item)"
                            :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                            v-for="(item, index) in prevMonth"
                            :key="item.id"
                        >
                            <div class="active">{{item.day}}</div>
                        </div>
                    </it-swiper-mini-item>
                    <it-swiper-mini-item class="it-swpier-calendar">
                        <!-- <div class="year-month">
                            {{nowMonth[15]?nowMonth[15].msg.substring(0,7):''}}
                        </div> -->
                        <div class="month-number">
                            <div class="year">
                                {{nowMonth[15]?nowMonth[15].year:''}}
                            </div>
                            <div class="month">
                                {{nowMonth[15]?nowMonth[15].month:''}}
                            </div>
                        </div>
                        <div
                            class="day-item"
                            @click="selectDay(index, item, 'select')"
                            v-for="(item, index) in nowMonth"
                            :class="{'day-active':currentValue===item.msg, 'forbid': item.ymdnumber > calcMaxYmd  || item.ymdnumber < calcMinYmd , 'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                            :key="item.msg"
                        >
                            <div class="active">{{item.day}}</div>
                        </div>
                    </it-swiper-mini-item>
                    <it-swiper-mini-item class="it-swpier-calendar">
                        <div class="month-number" v-if="!endBounce">
                            <div class="year">
                                {{nextMonth[15]?nextMonth[15].year:''}}
                            </div>
                            <div class="month">
                                {{nextMonth[15]?nextMonth[15].month:''}}
                            </div>
                        </div>
                        <div v-if="!endBounce"
                            class="day-item"
                            @click="selectDay(index, item, 'select')"
                            :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                            v-for="(item, index) in nextMonth"
                            :key="item.id"
                        >
                            <div class="active">
                                {{item.day}}
                            </div>
                        </div>
                    </it-swiper-mini-item>
                </it-swiper-mini>
                <div class="it-picker-slot-box" :class="{'it-calendar-only-time': type==='time'}" v-if="type==='calendar-time'||type==='time'">
                    <picker-slot ref="picker-0"
                        class="it-calendar-picker"
                        :default-value="currentHour"
                        :is-update="false"
                        :list-data="hour24"
                        @chooseItem="chooseItem"
                        :key-index="0"
                        :rows="pickerRows"
                        isLoop
                    ></picker-slot>
                    <div class="it-picker-list">
                            <div class="it-picker-indicator" :class="['it-picker-row'+pickerRows]">:</div>
                    </div>
                    <picker-slot 
                        ref="picker-1"
                        class="it-calendar-picker"
                        :default-value="currentMin"
                        :is-update="false"
                        :list-data="minutes"
                        @chooseItem="chooseItem"
                        :key-index="1"
                        isLoop
                        :rows="pickerRows"
                    ></picker-slot>
                </div>
            </div>
        </div>
    </it-dialog>
</template>
<script lang="ts" setup>
import { defineEmits, ref, defineProps, withDefaults, watch, getCurrentInstance, computed } from 'vue'
import ItDialog from '../../Dialog/src/Dialog.vue'
import type { Calendars } from '../../../libs/calendar'
import { outCalendar } from '../../../libs/calendar'
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
    calendarFormat?: number,
    closeAminate?: string
}>(), {
    modelValue: false,
    defaultValue: '2020-08-26 11:12',
    minDate: '2000-01-01 00:00',
    maxDate: '2200-12-30 23:59',
    type: 'calendar-time',
    weekText: () => ['日', '一', '二', '三', '四', '五', '六'],
    confirmText: '确定',
    titleText: '请选择日期',
    cancelText: '取消',
    // 日历滑动方向  column竖向， row横向
    dir: 'column',
    isVisible: false,
    hideOnClick: true,
    calendarFormat: 0,
    closeAminate: 'bottom'
})
const emit = defineEmits(['confirm', 'hide'])
const visible = ref<boolean>(false)
const dataType = ref<number>(0)
const currentValue = ref<string>('2020-08-26')
const currentHour = ref<string>('11') // 当前小时
const currentMin = ref<string>('11') // 当前选中的分
const app = getCurrentInstance()
const weekTextArr = computed(() => {
    if (props.calendarFormat === 0) {
        return props.weekText
    }
    const arr = JSON.parse(JSON.stringify(props.weekText))
    arr.push(arr.splice(0, 1)[0])
    return arr
})

watch(() => props.modelValue, (n) => {
    visible.value = n
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

function changeTab (index: number) {
    if (index === dataType.value) {
        return
    }
    dataType.value = index
    if (app?.refs['picker-1']) {
        app?.refs['picker-1'].modifyStatus(true);
        app?.refs['picker-0'].modifyStatus(true);
    }
}

function confrimSelect () {
    if (props.type === 'time') {
        emit('confirm', `${currentHour.value}:${currentMin.value}`)
    } else {
        emit('confirm', `${currentValue.value} ${currentHour.value}:${currentMin.value}`)
    }
    emit('hide')
}

const nextMonth = ref<Calendars[]>([])
const prevMonth = ref<Calendars[]>([])
const nowMonth = ref<Calendars[]>([])
let year = 0
let month = 0
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

function change (index: number) {
    if (index === 0) {
        nextMonth.value = nowMonth.value
        nowMonth.value = prevMonth.value
        let _year = nowMonth.value[15].year
        let _month = nowMonth.value[15].month
        year = _year
        month = _month
        if (_month === 1) {
            _month = 12
            _year--
        } else {
            _month--
        }
        prevMonth.value = outCalendar({ year: _year, month: _month })
        let time = this.calcPrevSameDay()
        let obj = this.findMonthIndex(time)
        this.selectDay(obj.index, obj.item)
        this.$refs.swiper.scrollTo(1, false)  
    }

    if (index === 2) {
        prevMonth.value = nowMonth.value
        nowMonth.value = nextMonth.value

        //计算下一个月的数组
        let _year = nowMonth.value[15].year
        let _month = nowMonth.value[15].month
        this.year = _year;
        this.month = _month;
        if (_month === 12) {
            _month = 1
            _year++
        } else {
            _month++
        }
        nextMonth.value = this.calcMonth(_year, _month);
        let time = this.calcNextSameDay()
            
        let obj = this.findMonthIndex(time)
        this.selectDay(obj.index, obj.item)
        this.$refs.swiper.scrollTo(1, false)  
    }
}
</script>
