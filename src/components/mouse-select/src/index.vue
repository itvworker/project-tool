<template>
    <div class="it-mouse-select" @mousedown="onMousedown" @mousemove="onMousemove" >
        <slot />
    </div>
</template>
<script lang="ts" setup >
import { getMouseRelative, getClassDom } from '../../../util/dom'
let isDown = false // 鼠标左健是否按下
let itDom:HTMLElement // it-calendar-content 元素
let maskDom:HTMLElement // 选择背景元素
let startX:number // 鼠标左健点击开始点
let startY:number // 鼠标左健点击开始点
let isMove = false //  鼠标是否在移动

interface Position {
    x: number,
    y: number
}

function onMousedown (e:MouseEvent):void {
    switch (e.button) {
    case 0:
        onMouseLeftButton(e)
        break

    default:
        break
    }
}
/**
 * 点击鼠标左健
 */
function onMouseLeftButton (e:MouseEvent) {
    if (!itDom) {
        itDom = getClassDom(e.target, 'it-mouse-select')
    }
    const pos: Position = getMouseRelative(itDom, e)
    startX = pos.x
    startY = pos.y

    if (!maskDom) {
        maskDom = document.createElement('div')
        maskDom.className = 'it-mouse-select-mask'
        maskDom.style.left = pos.x + 'px'
        maskDom.style.top = pos.y + 'px'
        maskDom.style.position = 'absolute'
        maskDom.style.backgroundColor = 'rgba(0,0,0,0.5)'
        maskDom.style.border = '#000 solid 1px'
    }

    isDown = true
}

function onMousemove (e: MouseEvent) {
    const pos: Position = getMouseRelative(itDom, e)
    if ((Math.abs(pos.x - startX) > 4 || Math.abs(pos.x - startY) > 4) && !isMove && isDown) {
        isMove = true
        itDom.appendChild(maskDom)
    }
    if (!isDown || !isMove) {
        return
    }

    if (startX > pos.x) {
        maskDom.style.right = itDom.clientWidth - startX + 'px'
        maskDom.style.left = ''
    } else {
        maskDom.style.left = startX + 'px'
        maskDom.style.right = ''
    }

    if (startY > pos.y) {
        maskDom.style.bottom = itDom.clientHeight - startY + 'px'
        maskDom.style.top = ''
    } else {
        maskDom.style.top = startY + 'px'
        maskDom.style.bottom = ''
    }

    maskDom.style.width = Math.abs(pos.x - startX) + 'px'
    maskDom.style.height = Math.abs(pos.y - startY) + 'px'
}

document.addEventListener('mouseup', () => {
    if (maskDom && isMove) {
        itDom.removeChild(maskDom)
    }
    isDown = false
    isMove = false
})

/** 选择框 end =============================== */
</script>
