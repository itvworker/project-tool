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
        <it-mouse-select class="it-calendar-content" >
            <calendar-item v-for="(item, index) in months" :index="index"  :key="index" :item="item" @click.native="onSelectDate(index, item)" >
                <template v-if="$slots.default" #default="data">
                    <slot v-bind="data"></slot>
                </template>
            </calendar-item>
        </it-mouse-select>
    </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, ref } from 'vue'
import { Calendars, Position, Section } from './lib/type'
import { outCalendar } from './lib/calendar'
import { formatDateMonent } from '../../../util'
import { getClassDom, getMouseRelative } from './lib/dom'
import CalendarItem from './calendar-item';
import ItMouseSelect from '../../mouse-select/src'
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

</script>
