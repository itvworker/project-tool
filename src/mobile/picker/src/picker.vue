<template>
    <it-dialog v-model="value" :mask="mask" dir="bottom" @closed="emit('closed')"  @opened="emit('opened')">
        <div class="it-picker-title" >
            <div class="it-left-btn" @click.stop="onCancel">取消</div>
            <div class="it-picker-title-text">
                请选择内容
            </div>
            <div class="it-right-btn" @click.stop="onSelected">确定</div>
        </div>
        <div class="picker-item">
            <picker-slot
            v-for="(item, index) in items"
            :is-update="value"
            :defaultValue="defaultValue[index]"
            :list-data="item"
            @chooseItem="chooseItem"
            :key="index"
            :key-index="index"
            :isLoop="true"
            :output="output"
            ref="el"
        ></picker-slot>
        </div>
    </it-dialog>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref, watch, onMounted } from 'vue'
import PickerSlot from './PickerSlot.vue'
import ItDialog from '../../Dialog/src/Dialog.vue'
import type { PickerProps, SlotItem } from './type'
import { prop } from 'vue-class-component'

interface Props extends PickerProps {
    modelValue: boolean,
    mask?: boolean,
    defaultValue?: string[] | number [],
    output?: (item: any) => string,
    items?: (SlotItem[] | string[] | number[])[],
    loop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    mask: true,
    loop: false,
    defaultValue: () => [],
    items: () => [],
    output: (value: any) : string => {
        if (typeof value === 'object') {
            return value.label.toString()
        }
        return value.toString()
    }
})

const emit = defineEmits(['update:modelValue', 'chooseItem', 'selected', 'close', 'open', 'opened', 'closed'])
const value = ref<boolean>(false)
let selected: string[] | number [] = []

watch(() => props.modelValue, (n) => {
    value.value = n
    init()
})

watch(value, (n) => {
    emit('update:modelValue', n)
    emit('close')
})

function init () {
    selected = []
    if (typeof props.defaultValue !== 'undefined') {
        selected = JSON.parse(JSON.stringify(props.defaultValue))
    }
}

function chooseItem (list:any, keyIndex:number, index:number) {
    if (!list || !props.modelValue) return
    emit('chooseItem', list, keyIndex, index)
    selected[keyIndex] = list
}

function onCancel (e: Touch) {
    value.value = false
    emit('close')
}

function onSelected (e: Touch) {
    value.value = false
    emit('selected', selected)
    emit('close')
}

onMounted(() => {
    init()
})
</script>
