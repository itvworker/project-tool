import { createVNode, nextTick, render, vModelCheckbox, watch } from 'vue'
import PickerConstructor from './PickerTime.vue'
import type { ComponentPublicInstance, VNode } from 'vue'
import type { PickerTimeOptions } from './type'

export default function (options:PickerTimeOptions = {}) {
    const data = {
        ...options,
        modelValue: false,
        'onUpdate:modelValue': (value: boolean) => {
            proxys.visible = value
        },
        onClosed () {
            render(null, container)
        }
    }

    const vm = createVNode(
        PickerConstructor,
        data
    )
    const container = document.createElement('div')
    render(vm, container)
    const proxys = vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>
    console.log(vm.component)
    nextTick(() => {
        proxys.visible = true
    })
}
