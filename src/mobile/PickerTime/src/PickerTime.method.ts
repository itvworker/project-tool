import { createVNode, nextTick, render, vModelCheckbox, watch } from 'vue'
import PickerConstructor from './PickerTime.vue'
import type { ComponentPublicInstance, VNode } from 'vue'
import { formatDateMonent } from '../../../util'
let PickerTimeInstance: VNode

interface PickerTimeOptions {
    [key:string] : any
}
function dataType (value: any):string {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
export default function (options:PickerTimeOptions = {}) {
    if (PickerTimeInstance) {
        const proxys = PickerTimeInstance.component?.proxy as ComponentPublicInstance<{ visible: boolean }>
        const props = PickerTimeInstance.component?.props
        const propsValue = PickerConstructor.props
        propsValue!.defaultValue.default = formatDateMonent(new Date(), 'yyyy-MM-dd hh:mm')
        propsValue!.minDate.default = formatDateMonent(new Date().getTime() - 365 * 24 * 60 * 60 * 1000 * 100, 'yyyy-MM-dd hh:mm')
        propsValue!.maxDate.default = formatDateMonent(new Date().getTime() + 365 * 24 * 60 * 60 * 1000 * 100, 'yyyy-MM-dd hh:mm')
        Object.keys(propsValue).forEach((item: string) => {
            if (props) {
                const type = dataType(propsValue[item].type) === 'function' ? dataType(propsValue[item].type()) : dataType(propsValue[item].type)
                if (options[item]) {
                    props[item] = options[item]
                    return
                }
                if (type === 'string' || type === 'number' || type === 'object' || type === 'function' || type === 'boolean') {
                    props[item] = propsValue[item].default
                    return
                }

                if (dataType(propsValue[item].default) === 'function') {
                    props[item] = propsValue[item].default()
                    return
                }
                props[item] = propsValue[item].default
            }
        })
        PickerTimeInstance.props = {
            ...options,
            'onUpdate:modelValue': (value: boolean) => {
                proxys.visible = value
            }
        }
        proxys.visible = true
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
        PickerConstructor,
        data
    )
    const container = document.createElement('div')
    render(vm, container)
    const proxys = vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>
    nextTick(() => {
        proxys.visible = true
    })

    PickerTimeInstance = vm
}
