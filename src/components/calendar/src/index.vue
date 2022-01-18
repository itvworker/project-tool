<template>
    <div class="it-calendar-box">
        <div class="it-calendar-title">
            {{months[15]?months[15].year+'年'+months[15].month+'月':''}}
        </div>
        <div class="it-calendar-weektext">
            <div class="it-calendar-weektext-item" v-for="(item, index) in weekText" :index="index" :key="index" >
                {{item}}
            </div>
        </div>
        <div class="it-calendar-content" @mousedown="onMousedown($event)" @mousemove="onMousemove" >
            <calendar-item v-for="(item, index) in months" :index="index"  :key="index" :item="item" @click.native="onSelectDate(index, item)" >
                <template v-if="$slots.default" #default="data">
                    <slot v-bind="data"></slot>
                </template>
            </calendar-item>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, ref } from 'vue'
import { Calendars, Position, Section } from './lib/type'
import { outCalendar } from './lib/calendar'
import { formatDateMonent } from '../../../util'
import { getClassDom, getMouseRelative } from './lib/dom'
import CalendarItem from './calendar-item';
// 月份所处的每一天
export interface Props {
    maxDate?: string, // 最大日期 精确到天
    minDate?: string, // 最小日期 精期到日
    value?: string, // 当前年月
    weekText?: string[],
    monthText?:string[],
    disabled?: (value?:string)=> boolean // 生成日历时是否禁止
    startWeek?: number
}

const props = withDefaults(defineProps<Props>(), {
    minDate: '1900-01-01',
    maxDate: '2200-01-01',
    value: formatDateMonent('', 'yyyy-MM'),
    disabled: function (value?:string):boolean {
        return false
    },
    startWeek: 1,
    weekText: () => ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    monthText: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
})

const dateArr: string[] = props.value.split('-')
const months = ref<Calendars[]>([])
months.value = outCalendar({
    year: parseInt(dateArr[0]),
    month: parseInt(dateArr[1]),
    minDate: props.minDate,
    maxDate: props.maxDate,
    disabled: props.disabled,
    startWeek: 1
})

function onSelectDate (index:number, item:Calendars) {
    if (item.disabled) {
        return
    }
    if (months.value[15].month !== item.month) {
        months.value = outCalendar({
            year: item.year,
            month: item.month,
            minDate: props.minDate,
            maxDate: props.maxDate,
            disabled: props.disabled
        })
    }
}

/** 选择框 start ========================== */
let isDown = false // 鼠标左健是否按下
let itDom:HTMLElement // it-calendar-content 元素
let maskDom:HTMLElement // 选择背景元素
let startX:number // 鼠标左健点击开始点
let startY:number // 鼠标左健点击开始点
let isMove = false //  鼠标是否在移动
function onMousedown (e:MouseEvent):void {
    switch (e.button) {
    case 0:
        onMouseLeftButton(e)
        break

    default:
        break
    }
}
/**
 * 点击鼠标左健
 */
function onMouseLeftButton (e:MouseEvent) {
    if (!itDom) {
        itDom = getClassDom(e.target, 'it-calendar-content')
    }
    const pos: Position = getMouseRelative(itDom, e)
    startX = pos.x
    startY = pos.y

    if (!maskDom) {
        maskDom = document.createElement('div')
        maskDom.className = 'it-calendar-select-mask'
        maskDom.style.left = pos.x + 'px'
        maskDom.style.top = pos.y + 'px'
    }

    isDown = true
}

function onMousemove (e:MouseEvent) {
    const pos: Position = getMouseRelative(itDom, e)
    if ((Math.abs(pos.x - startX) > 4 || Math.abs(pos.x - startY) > 4) && !isMove && isDown) {
        isMove = true
        itDom.appendChild(maskDom)
    }
    if (!isDown || !isMove) {
        return
    }

    if (startX > pos.x) {
        maskDom.style.right = itDom.clientWidth - startX + 'px'
        maskDom.style.left = ''
    } else {
        maskDom.style.left = startX + 'px'
        maskDom.style.right = ''
    }

    if (startY > pos.y) {
        maskDom.style.bottom = itDom.clientHeight - startY + 'px'
        maskDom.style.top = ''
    } else {
        maskDom.style.top = startY + 'px'
        maskDom.style.bottom = ''
    }

    maskDom.style.width = Math.abs(pos.x - startX) + 'px'
    maskDom.style.height = Math.abs(pos.y - startY) + 'px'
}

document.addEventListener('mouseup', () => {
    isDown = false
    isMove = false
    if (maskDom) {
        itDom.removeChild(maskDom)
    }
})

/** 选择框 end =============================== */
</script>
