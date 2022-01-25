<template>
    <div class="it-scale" ref="el" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, watch, getCurrentInstance, onMounted } from 'vue';
import type { ComponentInternalInstance } from 'vue'
interface Props {
    maxWidth?: number,
    maxHeight?: number,
}
let maxMultiple = 1
let minMultiple = 1
let press: boolean // 按下屏幕
let distance = 0
let scale = 1
let dom:any
let translateX = 0
let translateY = 0
let moveX = 0
let moveY = 0
const app = getCurrentInstance()
const props = withDefaults(defineProps<Props>(), {
    maxWidth: 0,
    maxHeight: 0
})
watch(props, () => {
    calc()
})

onMounted(() => {
    calc()
})

function calc () {
    let _isGetWidth = props.maxWidth >= props.maxHeight
    dom = app?.refs.el.children[0]
    let _width = dom.offsetWidth
    let _height = dom.offsetHeight
    if (_isGetWidth) {
        maxMultiple = props.maxWidth / _width
        return
    }
    maxMultiple = props.maxHeight / _height
}

function onTouchstart () {
    press = true
}

function onTouchmove (e:TouchEvent) {
    console.log(e)
    e.preventDefault()
    if (e.touches.length > 1) {
        setScale(e.touches[0], e.touches[1])
        setTransform()
        return
    }
    setTranslate(e.touches[0])
    setTransform()
}

function setScale (touches1:Touch, touches2:Touch) {
    const _x = Math.abs(touches1.clientX - touches2.clientX)
    const _y = Math.abs(touches1.clientY - touches2.clientY)
    const _s = Math.sqrt(_x * _x + _y * _y)
    if (distance) {
        const _scale = scale + (_s - distance) / dom.clientWidth
        scale = Math.max(_scale, _scale)
    }
    distance = _s
}

function setTranslate (touches:Touch) {
    const _x = touches.clientX
    const _y = touches.clientY

    if (moveX) {
        translateX += _x - moveX
    }
    if (moveY) {
        translateY += _y - moveY
    }
    moveX = _x
    moveY = _y
}

function setTransform () {
    dom.style.webkitTransform = `translate3d(${translateX}px,${translateY}px, 0px) scale(${scale})`
    dom.style.transform = `translate3d(${translateX}px,${translateY}px, 0px) scale(${scale})`
}
</script>
