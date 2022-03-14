<template>
    <div class="it-scale" ref="el"  @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>

import { defineProps, defineExpose, defineEmits, withDefaults, watch, getCurrentInstance, onMounted } from 'vue'
interface Props {
    maxWidth?: number,
    maxHeight?: number,
    bounce?: boolean,
    disabled?: boolean
}
let maxMultiple = 1
const minMultiple = 1
let press: boolean // 按下屏幕
let distance = 0
let scale = 1
let dom:any
let translateX = 0
let translateY = 0
let moveX = 0
let moveY = 0
let maxLeft = 0
let maxRight = 0
let maxTop = 0
let maxBottom = 0
let domWidth = 0
let domHeight = 0
let boxWidth = 0
let boxHeight = 0
let times = 0
let timeout: any

let touchStartX = 0 // 用于传给父组件
let startX = 0

const app = getCurrentInstance()
const props = withDefaults(defineProps<Props>(), {
    maxWidth: 0,
    maxHeight: 0,
    bounce: true,
    disabled: false
})
watch(props, () => {
    calc()
})

onMounted(() => {
    calc()
})

const emit = defineEmits(['toggle'])

function calc () {
    const _isGetWidth = props.maxWidth >= props.maxHeight
    const el:any = app?.refs.el
    dom = el.children[0]
    domWidth = dom.offsetWidth
    domHeight = dom.offsetHeight
    boxHeight = el.offsetHeight
    boxWidth = el.offsetWidth
    if (_isGetWidth) {
        maxMultiple = props.maxWidth / domWidth
        return
    }
    maxMultiple = props.maxHeight / domHeight
    calcMaxTouch()
}

// 计算最大滑动值
function calcMaxTouch () {
    const currentWidth = scale * domWidth
    const currentHeight = scale * domHeight

    // 如果当前宽度小于0时
    if (currentWidth <= boxWidth) {
        maxLeft = 0
        maxRight = 0
    } else {
        const remain = (currentWidth - boxWidth) / 2
        maxLeft = remain
        maxRight = -remain
    }

    if (currentHeight <= boxHeight) {
        maxTop = 0
        maxBottom = 0
    } else {
        const remain = (currentHeight - boxHeight) / 2
        maxTop = remain
        maxBottom = -remain
    }
}

function onTouchstart (e:TouchEvent) {
    press = true
    if (e.touches.length === 1) {
        ++times
    }
}

function onTouchmove (e:TouchEvent) {
    if (!press || props.disabled) return
    e.preventDefault()
    if (e.touches.length > 1) {
        setScale(e.touches[0], e.touches[1])
        calcMaxTouch()
        setTransform()
        return
    }
    setTranslate(e.touches[0])
    setTransform()
}

function onTouchend (e:TouchEvent) {
    if (e.targetTouches.length === 0) {
        ++times
    }
    press = false
    distance = 0
    moveX = 0
    moveY = 0
    if (translateX >= maxLeft) {
        translateX = maxLeft
    }
    if (translateX <= maxRight) {
        translateX = maxRight
    }
    if (translateY >= maxTop) {
        translateY = maxTop
    }
    if (translateY <= maxBottom) {
        translateY = maxBottom
    }
    setTransform()
    if (timeout) {
        clearTimeout(timeout)
    }
    if (times === 4) {
        onToggleScale()
        clearTimeout(timeout)
        times = 0
        return
    }
    timeout = setTimeout(() => {
        times = 0
    }, 200)
}

function onToggleScale () {
    if (scale > minMultiple) {
        scale = minMultiple
    } else {
        scale = maxMultiple
    }
    translateX = 0
    translateY = 0
    distance = 0
    moveX = 0
    moveY = 0
    calcMaxTouch()
    setTransform()
}

function setScale (touches1:Touch, touches2:Touch) {
    const _x = Math.abs(touches1.clientX - touches2.clientX)
    const _y = Math.abs(touches1.clientY - touches2.clientY)
    const _s = Math.sqrt(_x * _x + _y * _y)
    if (distance) {
        let _scale = scale + (_s - distance) * scale / dom.clientWidth
        if (_scale >= maxMultiple) {
            _scale = maxMultiple
        }
        if (_scale <= minMultiple) {
            _scale = minMultiple
        }
        scale = _scale
    }
    distance = _s
    calcMaxTouch()
}

function setTranslate (touches:Touch) {
    const _x = touches.clientX
    const _y = touches.clientY
    if (moveX) {
        translateX += _x - moveX
        if (translateX >= maxLeft) {
            translateX = maxLeft
        }
        if (translateX <= maxRight) {
            translateX = maxRight
        }
    }
    if (moveY) {
        translateY += _y - moveY
        if (translateY >= maxTop) {
            translateY = maxTop
        }
        if (translateY <= maxBottom) {
            translateY = maxBottom
        }
    }
    moveX = _x
    moveY = _y
}

function setTransform () {
    dom.style.webkitTransform = `translate3d(${translateX}px,${translateY}px, 0px) scale(${scale})`
    dom.style.transform = `translate3d(${translateX}px,${translateY}px, 0px) scale(${scale})`
    emit('toggle', scale > minMultiple)
}
function onRestart () {
    translateX = 0
    translateY = 0
    distance = 0
    moveX = 0
    moveY = 0
    calcMaxTouch()
    setTransform()
}

defineExpose({
    onRestart
})
</script>
