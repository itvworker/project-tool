<template>
    <it-dialog v-model="modelValue" :mask="mask" dir="bottom">
        <div class="picker-item">
            <picker-slot
            v-for="(item, index) in items"
            :is-update="modelValue"
            :default-value="defaultValue[index]"
            :list-data="item"
            @chooseItem="chooseItem"
            :key="index"
            :key-index="index"
            :isLoop="true"
            :output="output"
        ></picker-slot>
        </div>
    </it-dialog>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from 'vue'
import PickerSlot from '../src/picker-slot.vue'
import ItDialog from '@/mobile/dialog/src/ItDialog.vue'
interface SlotItem {
    label?: string,
    value: number | string,
    disabled?: boolean,
    type?: number | string,
    data?: any
}
interface Props {
    modelValue: boolean,
    mask?: boolean,
    defaultValue?: string[] | number [],
    output?: (item: any) => string,
    items?: (SlotItem[] | string[] | number[])[]
}
const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    mask: true,
    defaultValue: () => [],
    items: () => [],
    output: (value: any) : string => {
        if (typeof value === 'object') {
            return value.label.toString()
        }
        return value.toString()
    }
})
const emit = defineEmits(['chooseItem'])

function chooseItem() {
    
}
</script>
