<template>
    <div class="it-model" ref="el">
        <transition
        name="it-dialog-fade"
        v-show="modelValue"
        >
        <div class="it-model-bg" :style="{'z-index':zIndex, 'background-color':bgColor}" @click.stop="emit('update:modelValue', false)">

        </div>
        </transition>

        <transition
            @after-enter="afterEnter"
            @after-leave="afterLeave"
            @before-leave="beforeLeave"
         :name="`it-dialog-${dir}`" v-show="modelValue">
            <div :class="`it-dialog-${dir}`"  :style="{'z-index':zIndex+1}">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, withDefaults, ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['opened', 'closed', 'close', 'update:modelValue'])

function afterEnter () {
    emit('opened')
}

function afterLeave () {
    emit('closed')
}

function beforeLeave () {
    emit('close')
}

interface Props {
    bgColor?: string,
    to?: string,
    modelValue: boolean,
    dir?: string,
    zIndex?: number,
    mask?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    bgColor: 'rgba(0, 0, 0, 0.6)',
    to: 'body',
    modelValue: false,
    dir: 'center',
    zIndex: 1000,
    mask: false
})
const el = ref<HTMLElement>()
onMounted(() => {
    document.body.appendChild(el.value)
})
onBeforeUnmount(() => {
    document.body.removeChild(el.value)
})

</script>
