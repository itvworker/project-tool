<template>
  <div class="it-picker-list" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"  @touchcancel="touchEnd">
    <div class="it-picker-content" :class="['it-picker-row'+rows]"    ref="height" >
        <div class="it-picker-list-panel"  ref="list"  @transitionend="transitionEnd"  @webkitTransitionEnd="transitionEnd">
            <div class="it-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll,'picker-forbid': typeof item === 'object' && item.disabled }" v-for="(item,index) in listData"
                :key="index+'up'">
                <slot v-bind="item">
                    {{output(item)}}
                </slot>
            </div>
            <div class="it-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll, 'picker-forbid': typeof item === 'object' && item.disabled}" v-for="(item,index) in listData"
                :key="index+'up1'"
                >
                <slot  v-bind="item">
                    {{output(item)}}
                </slot>
                </div>
            <div class="it-picker-item" :class="{'picker-forbid': typeof item === 'object' && item.disabled}" :style="{height: lineSpacing+'px'}"  v-for="(item,index) in listData"
                :key="index"  >
                <slot v-bind="item">
                    {{output(item)}}
                </slot>
            </div>
            <div class="it-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll, 'picker-forbid': typeof item === 'object' && item.disabled}"  v-for="(item,index) in listData"
                :key="index+'next'">
                <slot v-bind="item">
                    {{output(item)}}
                </slot>
            </div>
            <div class="it-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll, 'picker-forbid': typeof item === 'object' && item.disabled}"  v-for="(item,index) in listData"
                :key="index+'next2'">
                <slot  v-bind="item">
                    {{output(item)}}
                </slot>
            </div>
        </div>
    </div>
    <div class="it-picker-mask"  :class="['it-picker-row'+rows, {'clear-mask': clearMask}]"></div>
    <div class="it-picker-indicator"  :class="['it-picker-row'+rows]"></div>
</div>
</template>
<script lang="ts" setup>

import { defineProps, defineEmits, defineExpose, computed, ref, withDefaults, getCurrentInstance, onBeforeMount, onMounted, watch } from 'vue'

interface SlotItem {
    label?: string,
    value: number | string,
    disabled?: boolean,
    type?: number | string,
    data?: any
}

interface Props {
    listData: SlotItem[] | string[] | number[],
    defaultValue?: string | number,
    keyIndex?: number,
    isUpdate?: boolean,
    lastChange?: boolean,
    loop?: boolean,
    rows?: number,
    pickerIndex?: number | null,
    clearMask?: boolean,
    output?: (item: any) => string
}

const props = withDefaults(defineProps<Props>(), {
    keyIndex: 0,
    isUpdate: false,
    lastChange: false,
    loop: false,
    rows: 5,
    pickerIndex: null,
    clearMask: false,
    output: (value: any) : string => {
        if (typeof value === 'object') {
            return value.label.toString()
        }
        return value.toString()
    }
})
let isTouch = false
const touchParams = {
    startY: 0,
    endY: 0,
    startTime: 0,
    endTime: 0,
    lastY: 0,
    lastTime: 0
}
let transformY = 0
let scrollDistance = 0
let moveArr:{y:number, timestamp: number}[] = []
const lineSpacing = ref<number>(0)
let currIndex = 1
const maxLast = computed(() => (props.listData.length - 3) * lineSpacing.value)
const minLast = computed(() => (props.listData.length - 1) * lineSpacing.value + (props.listData.length - 3) * lineSpacing.value)
const isLoopScroll = computed(() => props.loop && props.listData.length >= Math.floor(props.rows / 2) + 1)
const listIndexs = computed(() => {
    return props.listData.map((item) => {
        if (typeof item === 'object') {
            return item.value.toString() || item
        }
        return item
    })
})

const app = getCurrentInstance()
const emit = defineEmits(['chooseItem'])
function setMove (move:number, type?:string, time?:number) {
    transformY = move + transformY
    if (type === 'end') { // 手指结束滑动走这里
        if (!isLoopScroll.value) {
            calcOverScroll()
        }

        // 设置滚动距离为lineSpacing的倍数值
        transformY = Math.round(transformY / lineSpacing.value) * lineSpacing.value
        setTransform(transformY, type, time)
        currIndex = (Math.abs(Math.round(transformY / lineSpacing.value)) + 1)
    } else {
        if (isLoopScroll.value) {
            if (transformY > lineSpacing.value) {
                transformY = transformY - props.listData.length * lineSpacing.value
            }

            if (transformY < -props.listData.length * lineSpacing.value) {
                transformY = Math.abs(transformY) - props.listData.length * lineSpacing.value
            }
        }
        setTransform(transformY, null, null)
        currIndex = (Math.abs(Math.round(transformY / lineSpacing.value)) + 1)
    }
}

function setTransform (translateY = 0, type:string | null, time:number | undefined | null) {
    const dom:any = app?.refs.list
    if (type === 'end') { // 手指结束滑动时走这里，给过渡动画加上时间
        dom.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
    } else {
        dom.style.webkitTransition = ''
    }
    // 给过dom加上滑动所要滑动的点
    dom.style.marginTop = `-${lineSpacing.value * props.listData.length * 2}px`
    dom.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`
    scrollDistance = translateY
    transformY = translateY
}
/**
 * 计算时否超出来滚距离
 */
function calcOverScroll () {
    if (isLoopScroll.value) {
        if (transformY > maxLast.value) {
            transformY = maxLast.value
        }
        if (transformY < -minLast.value) {
            transformY = -minLast.value
        }
    } else {
        if (transformY > 0) {
            transformY = 0
        }
        if (transformY < -(props.listData.length - 1) * lineSpacing.value) {
            transformY = -(props.listData.length - 1) * lineSpacing.value
        }
    }
}

/**
 * 获取100毫秒的距离和时间
 *  */
function getDistance () {
    let index = moveArr.length - 1
    if (index <= 0) {
        return {
            timestamp: 0,
            disY: 0
        }
    }
    const last = moveArr[index]
    for (let i = index; i >= 0; i--) {
        if (last.timestamp - moveArr[i].timestamp < 300) {
            index = i
        } else {
            break
        }
    }
    if (index === moveArr.length - 1) {
        return {
            timestamp: 0,
            disY: 0
        }
    }

    return {
        timestamp: last.timestamp - moveArr[index].timestamp,
        disY: last.y - moveArr[index].y
    }
}

/**
 * 过渡动画结束
 */
function transitionEnd () {
    let index = Math.round(-transformY / lineSpacing.value)
    if (index > props.listData.length - 1) {
        const num = index - props.listData.length
        transformY = -num * lineSpacing.value
    }
    if (index < 0) {
        const num = props.listData.length + index
        transformY = -num * lineSpacing.value
    }
    index = Math.round(-transformY / lineSpacing.value)
    setTransform(transformY, null, null)
    setChooseValue()
}

function setChooseValue () {
    if (isTouch) return
    const index = Math.round(-transformY / lineSpacing.value)
    if (!props.listData[index]) return
    emit('chooseItem', props.listData[index], props.keyIndex, index)
}

function modifyStatus (type?: boolean, defaultValue?: number | string) {
    const dom:HTMLElement = app?.refs.height as HTMLElement
    lineSpacing.value = dom.clientHeight
    defaultValue = defaultValue || props.defaultValue
    if (typeof defaultValue === 'number') {
        defaultValue = defaultValue.toString()
    }
    const index = listIndexs.value.indexOf(defaultValue as string)
    const move = index === -1 ? 0 : (index * lineSpacing.value)
    transformY = -move
    type && setChooseValue()
    setTransform(transformY, null, null)
}

function touchStart (event: TouchEvent) {
    isTouch = true
    const changedTouches = event.changedTouches[0]
    touchParams.startY = changedTouches.pageY
    touchParams.lastY = changedTouches.pageY
    touchParams.startTime = event.timeStamp || Date.now()
    transformY = scrollDistance
}

function touchMove (event:TouchEvent) {
    event.preventDefault()
    const changedTouches = event.changedTouches[0]
    const move = changedTouches.pageY - touchParams.lastY
    touchParams.lastY = changedTouches.pageY
    touchParams.lastTime = event.timeStamp || Date.now()
    moveArr.push({
        y: changedTouches.pageY,
        timestamp: event.timeStamp || Date.now()
    })
    if (moveArr.length > 20) {
        moveArr = moveArr.splice(-20, 20)
    }
    setMove(move)
}

function touchEnd (event: TouchEvent) {
    isTouch = false
    event.preventDefault()

    const changedTouches = event.changedTouches[0]
    let move = changedTouches.pageY - touchParams.lastY
    touchParams.lastY = changedTouches.pageY
    touchParams.lastTime = event.timeStamp || Date.now()
    let moveTime = touchParams.lastTime - touchParams.startTime
    // this.setMove(move);
    moveArr.push({
        y: changedTouches.pageY,
        timestamp: event.timeStamp || Date.now()
    })
    if (moveArr.length > 20) {
        moveArr = moveArr.splice(-20, 20)
    }

    const moveDis = getDistance()
    if (Math.abs(moveDis.disY) >= 50) {
        move = moveDis.disY
        if (Math.abs(move) > (props.listData.length - 1) * lineSpacing.value) {
            if (move >= 0) {
                move = (props.listData.length - 1) * lineSpacing.value
            } else {
                move = -(props.listData.length - 1) * lineSpacing.value
            }
        }

        moveTime = moveDis.timestamp * 8
        setMove(move, 'end', moveTime)
    } else {
        setMove(move, 'end', 100)
    }
    isTouch = false
}

function init () {
    setTimeout(() => {
        const dom:HTMLElement = app?.refs.height as HTMLElement
        lineSpacing.value = Math.round(dom.clientHeight) // 每一行的高度
        modifyStatus(true)
    })
}
watch(() => props.isUpdate, () => {
    init()
})

watch(() => props.listData, (n, o) => {
    const lineIndex = Math.abs(Math.floor(scrollDistance / lineSpacing.value))
    const index = Math.min(n.length - 1, lineIndex)
    scrollDistance = -index * lineSpacing.value
    transformY = scrollDistance
    modifyStatus(true)
})

watch(() => props.defaultValue, (n) => {
    modifyStatus()
})

interface Views {
    [key: string] : any
}

defineExpose({
    modifyStatus
})
</script>
