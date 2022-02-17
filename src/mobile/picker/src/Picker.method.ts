import { createVNode, nextTick, render, vModelCheckbox, watch } from 'vue'
import PickerConstructor from './picker.vue'
import type { ComponentPublicInstance, VNode } from 'vue'
import type { PickerOptions } from './type'

export default function (options:PickerOptions = {}) {
    const data = {
        ...options,
        modelValue: false,
        'onUpdate:modelValue': (value: boolean) => {
            console.log('update:modelValue')
            proxys.value = value
        },
        onOpened () {
            console.log('onOpen')
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
    const proxys = vm.component!.proxy as ComponentPublicInstance<{ value: boolean }>
    console.log(vm.component)
    nextTick(() => {
        proxys.value = true
    })
}
