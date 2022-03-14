import type { VNode } from 'vue'
export interface CalendarTimeProps {
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
}
export interface CalendarTimeOptions {
    [key:string] : any
}

export type CalendarTimeInstacnce = {
    vm: VNode,
    visible: boolean
}
