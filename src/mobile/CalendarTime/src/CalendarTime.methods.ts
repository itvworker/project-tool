import { createVNode, nextTick, render, Slot } from 'vue'
import type { VNode, ComponentPublicInstance } from 'vue'
import CalendarTimeConstructor from './CalendarTime.vue'
import type { CalendarTimeOptions } from './CalendarTime'
import { formatDateMonent } from '../../../util'
let CalendarTimeInstacnce: VNode

function dataType (value: any):string {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
export default function (options:CalendarTimeOptions = {}) {
    if (CalendarTimeInstacnce) {
        const proxys = CalendarTimeInstacnce.component?.proxy as ComponentPublicInstance<{ visible: boolean }>
        const props = CalendarTimeInstacnce.component?.props
        const propsValue = CalendarTimeConstructor.props
        propsValue!.defaultValue.default = formatDateMonent(new Date(), 'yyyy-MM-dd hh:mm')
        propsValue!.minDate.default = formatDateMonent(new Date().getTime() - 365 * 24 * 60 * 60 * 1000 * 100, 'yyyy-MM-dd hh:mm')
        propsValue!.maxDate.default = formatDateMonent(new Date().getTime() + 365 * 24 * 60 * 60 * 1000 * 100, 'yyyy-MM-dd hh:mm')
        Object.keys(propsValue).forEach((item: string) => {
            if (props) {
                const type = dataType(propsValue[item].type())
                if (options[item]) {
                    props[item] = options[item]
                    return
                }
                if (type === 'string' || type === 'number' || type === 'object' || type === 'function' || type === 'boolean') {
                    props[item] = propsValue[item].default
                    return
                }
                props[item] = propsValue[item].default()
            }
        })
        CalendarTimeInstacnce.props = {
            ...options,
            'onUpdate:modelValue': (value: boolean) => {
                proxys.visible = value
            }
        }
        // console.log(Object.assign(props, options))
        proxys.visible = true
        console.log(CalendarTimeInstacnce)
        return
    }
    const data = {
        ...options,
        modelValue: false,
        'onUpdate:modelValue': (value: boolean) => {
            proxys.visible = value
        }
    }
    const vm = createVNode(
        CalendarTimeConstructor,
        data
    )
    const container = document.createElement('div')
    render(vm, container)
    const proxys = vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>
    nextTick(() => {
        proxys.visible = true
    })
    CalendarTimeInstacnce = vm
}
