<template>
    <div
        ref="el"
        class="it-swiper-mini"
        :style="{ height: swiperHeight + 'px' }"
        @resize="resize"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        @touchcancel="touchend"
    >
        <div
            class="it-swiper-mini-touch"
            @transitionend="aniamteend"
            ref="box"
            :class="['it-swiper-mini-flex-' + direction, {'it-swiper-mini-animating': isAnimating,'it-move-anmiating': isMove === 1}]"
        >
            <div
                class="it-swiper-mini-item last-one"
                v-if="items.length >= 2 && loop === true"
                v-html="lastOne"
            ></div>
            <slot></slot>
            <div
                class="it-swiper-mini-item first-one"
                v-if="items.length >= 2 && loop === true"
                v-html="firstOne"
            ></div>
        </div>
        <slot name="dot"></slot>
    </div>
</template>
<script lang="ts" setup>
import render from '../../../libs/render'
import getDirection from '../../../libs/touch'
import type { ComponentInternalInstance } from 'vue'
import {
    withDefaults,
    defineProps,
    watch,
    ref,
    getCurrentInstance,
    onMounted,
    defineEmits,
    nextTick,
    defineExpose,
    provide
} from 'vue'
interface Props {
    modelValue: number
    // 是否循环
    loop?: boolean
    // row为横向，column为纵向
    direction?: string
    bounce?: boolean
    /**
     * 向下或向右滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
     */
    beginBounce?: boolean
    swiperHeight?: number | null
    /**
     * 向上或向左滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
     */
    endBounce?: boolean,
    disabled?:boolean,
    isUpdate?:boolean
}
const props = withDefaults(defineProps<Props>(), {
    value: 0,
    // 是否循环
    loop: false,
    // row为横向，column为纵向
    direction: 'row',
    bounce: true,
    /**
     * 向下或向右滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
     */
    beginBounce: false,
    swiperHeight: null,
    /**
     * 向上或向左滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
     */
    endBounce: false,
    disabled: false,
    isUpdate: false
})

const isAnimating = ref<boolean>(false) // 动画是否在进行中，
let touchstartTime = 0 // touchstart开始的时间戳
let startX = 0 // touchstart的开始接触点
let startY = 0 // touchstart的开始接触点
let moveX = 0 // touch记录上次手指接触点
let moveY = 0 // touch记录上次手指接触点
let isTouch = false // 手指是否接触了屏幕
let elSize = 0 // 元素的高或宽
let nowIndex = 0 // 当有滚动的张数
let coordinate = 0 // 滑动值
const isMove = ref<number>(0) // 0为初始状态，1允许滑动，2不允许滑动
let number = 0 // 子元素张数
let moveMax = 0 // 滑动的最大值
const lastOne = ref<string>() // 循环是复制后一张
const firstOne = ref<string>() // 循环是复制第一张
const children = ref<ComponentInternalInstance[]>([])
let dom: (left: number, top: number, zoom: number) => void
const items = ref<ComponentInternalInstance[]>([])
const winWidth = ref<number>(window.innerWidth)
let elPositon: any = {}
const currentPage: any = getCurrentInstance()
const emit = defineEmits(['update:modelValue', 'change', 'touchmove', 'touchend', 'stop', 'refresh', 'first', 'last']) // 注册事件
let screenType: string
let timeout: any

function changeItem () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        items.value = children.value.sort(
            (a: ComponentInternalInstance, b: ComponentInternalInstance) => {
                const start: any = a.refs.el
                const end: any = b.refs.el
                return start.offsetTop - end.offsetTop
            }
        )
        init()
    })
}

provide('children', children)
provide('changeItem', changeItem)
watch(winWidth, () => {
    nextTick(() => {
        resize()
    })
})
watch(() => props.modelValue, (n: any) => {
    let _coordinate = n * elSize
    if (isLoop()) {
        _coordinate = (n + 1) * elSize
    }

    if (_coordinate === coordinate) {
        return
    }

    scrollTo(n, true)
})

watch(() => props.isUpdate, () => {
    nextTick(() => {
        init()
    })
})

function thirdOne (): number {
    return parseInt((elSize / 3).toString())
}
// 是否满足循环需求
function isLoop () {
    return number > 2 && props.loop
}
// 现在所处大小
function nowPosition (): number {
    return nowIndex * elSize
}

// 判断是否为尽到滑动还要向尽头滑
function isMoveMax (value: number): boolean {
    if (coordinate < 0 && value > 0) return true
    if (coordinate > moveMax && value < 0) return true
    return false
}
// 滑动后是切换到下张，还是上一张,
function isSpeedDir () {
    const remain = coordinate - nowIndex * elSize
    if (remain > 0 && remain > thirdOne()) {
        return 'next' // 下一张
    }
    if (remain < 0 && Math.abs(remain) > thirdOne()) {
        return 'prev' // 上一张
    }
    return 'now' // 不变当前张
}

// 滚动到第几张,带动画
function scrollTo (_value: number, _isAnimate: boolean) {
    if (_value < 0 || _value >= number) return
    isAnimating.value = _isAnimate
    nextTick(() => {
        if (isLoop()) {
            nowIndex = _value + 1
        } else {
            nowIndex = _value
        }
        coordinate = nowIndex * elSize

        setPostion()
        emit('update:modelValue', _value)
        if (!isAnimating.value) {
            emit('change', _value)
        }
    })
}

function aniamteend () {
    isAnimating.value = false
    if (isLoop() && nowIndex === 0) {
        coordinate = number * elSize
        nowIndex = number
    }

    if (isLoop() && nowIndex > number) {
        coordinate = elSize
        nowIndex = 1
    }

    if (isLoop()) {
        emit('change', nowIndex - 1)
        emit('update:modelValue', nowIndex - 1)
        setPostion()
        return
    }

    emit('change', nowIndex)
    emit('update:modelValue', nowIndex)
}

// 设置box的高或宽
function setElSize () {
    if (props.direction === 'row') {
        elSize = currentPage.refs.el.clientWidth
        return
    }
    elSize = currentPage.refs.el.clientHeight
    elPositon = currentPage.refs.el.getBoundingClientRect()
}
// 初始box的数量
function initNumber () {
    number = items.value.length
}
// 计算
function calcMax () {
    if (number >= 2 && props.loop) {
        moveMax = (number + 1) * elSize
        return
    }
    moveMax = (number - 1) * elSize
}
// 初始化位置，索引
function initCoordinate () {
    if (number >= 2 && props.loop) {
        nowIndex = props.modelValue + 1

        coordinate = nowIndex * elSize
        setPostion()
        return
    }
    nowIndex = props.modelValue
    coordinate = nowIndex * elSize
    setPostion()
}
function clone () {
    if (number >= 2 && props.loop) {
        firstOne.value = (items.value[0].refs.el as HTMLElement).innerHTML
        lastOne.value = (items.value[items.value.length - 1].refs.el as HTMLElement).innerHTML
    }
}
function init () {
    dom = render(currentPage.refs.box)
    setElSize()
    initNumber()
    calcMax()
    clone()
    initCoordinate()
    isAnimating.value = false
}
function resize () {
    setElSize()
    calcMax()
    coordinate = nowIndex * elSize
    setPostion()
}

function setPostion () {
    if (props.direction === 'row') {
        dom(coordinate, 0, 1)
        return
    }
    dom(0, coordinate, 1)
}

function touchstart (e: TouchEvent) {
    if (props.disabled) return
    // 判断动画是否在进行中, 进行中禁止滑动
    if (isAnimating.value) {
        aniamteend()
    }
    elPositon = currentPage.refs.el.getBoundingClientRect()
    isAnimating.value = false
    touchstartTime = new Date().getTime()
    const _self = e.targetTouches
    if (self.length <= 1) {
        startX = _self[0].pageX
        startY = _self[0].pageY
        moveX = startX
        moveY = startY
        isTouch = true
    }
}

function touchmove (e: TouchEvent) {
    console.log('touchmove')
    if (!isTouch || props.disabled || e.touches.length > 1) {
        return false
    }
    const _self = e.targetTouches
    const _x = _self[0].pageX
    const _y = _self[0].pageY
    e.preventDefault()
    const _positon = elPositon
    if (_x < _positon.left || _x > _positon.right || _y < _positon.top || _y > _positon.bottom) {
        touchend(e)
        return
    }

    const obj = getDirection(moveX, moveY, _x, _y, !screenType)
    if (obj.type > 2 && isMove.value === 0) {
        screenType = 'progress'
        if (props.direction === 'row') {
            isMove.value = 1
        } else {
            isMove.value = 2
        }
    }

    if (obj.type >= 1 && obj.type <= 2 && isMove.value === 0) {
        screenType = 'vertical'
        if (props.direction === 'column') {
            isMove.value = 1
        } else {
            isMove.value = 2
        }
    }

    if (isMove.value === 1) {
        e.preventDefault()
        // e.stopPropagation()
    }

    if (obj.type > 0 && isMove.value === 1) {
        //   e.preventDefault();
        moveX = _x
        moveY = _y
        switch (screenType) {
        case 'vertical':
            if (isMoveMax(obj.angy)) {
                const post = coordinate - obj.angy * 0.4
                coordinate = post
            } else {
                if (
                    (props.beginBounce &&
                            obj.type === 2 &&
                            coordinate < nowPosition()) ||
                        (props.endBounce &&
                            obj.type === 1 &&
                            coordinate > nowPosition())
                ) {
                    coordinate -= obj.angy * 0.4
                } else {
                    coordinate -= obj.angy
                }
            }
            break
        case 'progress':
            if (isMoveMax(obj.angx)) {
                coordinate = coordinate - obj.angx * 0.4
            } else {
                if ((props.beginBounce && obj.type === 4 && coordinate < nowPosition()) ||
                (props.endBounce && obj.type === 3 && coordinate > nowPosition())
                ) {
                    coordinate -= obj.angx * 0.4
                } else {
                    coordinate -= obj.angx
                }
            }
            break
        }

        if (!props.bounce) {
            if (coordinate <= 0) {
                coordinate = 0
            }
            if (coordinate >= moveMax) {
                coordinate = moveMax
            }
        }
        emit('touchmove', e)
        setPostion()
    }
}
function touchend (e: TouchEvent) {
    console.log('touchend')
    if (props.disabled) return
    emit('touchend', e)
    isTouch = false
    isMove.value = 0
    const _screenType = screenType
    screenType = ''
    if (_screenType) {
        const _now = new Date().getTime()
        let _dis = moveX - startX
        if (props.direction === 'column') {
            _dis = moveY - startY
        }

        const _isfast = Math.abs(_dis) > 20 && _now - touchstartTime < 300 // 是否快速滑过
        const _isChangePos = Math.abs(coordinate) % elSize // 是否有移动

        if (_isChangePos) {
            isAnimating.value = true
        }

        // 滑动到最小值
        if (coordinate <= 0) {
            coordinate = 0
            nowIndex = 0
            setPostion()
            emit('first')
            return
        }

        // 滑动到最大值
        if (coordinate >= moveMax) {
            coordinate = moveMax
            setPostion()
            emit('last')
            return
        }
        // 快速滑过

        if ((_isfast && _dis < -20) || isSpeedDir() === 'next') {
            if (!props.endBounce) {
                nowIndex++
            }
            coordinate = nowIndex * elSize
            setPostion()
            return
        }

        if ((_isfast && _dis > 20) || isSpeedDir() === 'prev') {
            if (!props.beginBounce) {
                nowIndex--
            }
            coordinate = nowIndex * elSize
            setPostion()
            return
        }

        coordinate = nowIndex * elSize
        setPostion()
    }
}

onMounted(() => {
    window.addEventListener('resize', () => {
        winWidth.value = window.innerWidth
    })
})

defineExpose({
    scrollTo
})
</script>
