<template>
    <div
        ref="el"
        class="it-images-preview"
        :style="{ height: swiperHeight + 'px' }"
        @resize="resize"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        @touchcancel="touchend"
    >
        <div
            class="it-images-preview-touch"
            @transitionend="aniamteend"
            ref="box"
            :class="['it-images-preview-flex-' + direction, {'it-images-preview-animating': isAnimating,'it-move-anmiating': isMove === 1}]"
        >
            <div
                class="it-images-preview-item last-one"
                v-if="images.length >= 2 && loop === true"
                v-html="lastOne"
            ></div>
            <div class="it-images-preview-item" ref="children" v-for="(item, index) in images" :key="index+item.src" >
                <img class="it-images-preview-img" ref="img" :src="item.loaded? item.src: ''" @load="onLoadImage(item, $refs.img[index])">
            </div>
            <slot></slot>
            <div
                class="it-images-preview-item first-one"
                v-if="images.length >= 2 && loop === true"
                v-html="firstOne"
            ></div>
        </div>
        <slot name="dot"></slot>
    </div>
</template>
<script lang="ts" setup>
import render from '../../../libs/render'
import getDirection from '../../../libs/touch'
import {
    withDefaults,
    defineProps,
    watch,
    ref,
    getCurrentInstance,
    onMounted,
    defineEmits,
    nextTick
} from 'vue'

interface Item {
    src: string,
    width?: number,
    height?: number,
    loaded?: boolean,
    img?:HTMLElement
}
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
    images?: Item[]
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
    images: () => []
})

/** 滑动切换相册的事件值 */
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
let moveMax = 0 // 滑动的最大值
const lastOne = ref<string>() // 循环是复制后一张
const firstOne = ref<string>() // 循环是复制第一张
let dom: (left: number, top: number, zoom: number) => void
const winWidth = ref<number>(window.innerWidth)
let elPositon: any = {}
const app: any = getCurrentInstance()
const emit = defineEmits(['update:modelValue', 'change', 'touchmove', 'touchend', 'stop', 'refresh']) // 注册事件
let screenType: string

/** 相册放大移动的值 */
let maxMultiple = 1 // 当前照片最大放大值
const minMultiple = 1 // 当前照片最小放小值
let distance = 0 // 两只手指的距离
let scale = 1 // 当前照片放大的倍数
let translateX = 0 // 相片移动的位置
let translateY = 0 // 相片移动的位置
let maxLeft = 0 // 当前相片最大移动置
let maxRight = 0 // 当前相片最大移动置
let maxTop = 0 // 当前相片最大移动置
let maxBottom = 0 // 当前相片最大移动置
let domWidth = 0 // 相片初始化时的宽度
let domHeight = 0 // 相片初始化时的高度
let boxWidth = 0 // 相册的宽度
let boxHeight = 0 // 相册的高度
let times = 0
let timeout: any
let endtimeout: any
let initX = 0
let initY = 0
let clientX = 0
let clientY = 0
let img:any
watch(winWidth, () => {
    nextTick(() => {
        resize()
    })
})

watch(() => props.modelValue, () => {
    scale = 1
    translateX = 0
    translateY = 0
    props.images.forEach(item => {
        if (item.img) {
            item.img.style.webkitTransform = 'translate3d(0px,0px, 0px) scale(1)'
            item.img.style.transform = 'translate3d(0px,0px, 0px) scale(1)'
        }
    })
    calcImage()
    calcMaxTouch()
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

function thirdOne (): number {
    return parseInt((elSize / 3).toString())
}
// 是否满足循环需求
function isLoop () {
    return props.images.length > 2 && props.loop
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
    if (_value < 0 || _value >= props.images.length) return
    isAnimating.value = !!_isAnimate
    nextTick(() => {
        if (isLoop()) {
            nowIndex = _value + 1
        } else {
            nowIndex = _value
        }
        coordinate = nowIndex * elSize

        setPostion()
        emit('update:modelValue', _value)
        emit('change', _value)
        calcMaxTouch()
        calcImage()
    })
}

function aniamteend () {
    isAnimating.value = false
    if (isLoop() && nowIndex === 0) {
        coordinate = props.images.length * elSize
        nowIndex = props.images.length
    }

    if (isLoop() && nowIndex > props.images.length) {
        coordinate = elSize
        nowIndex = 1
    }

    if (isLoop()) {
        if (nowIndex - 1 === props.modelValue) return
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
    elSize = app.refs.el.clientWidth
    elPositon = app.refs.el.getBoundingClientRect()
}

// 计算
function calcMax () {
    if (props.images.length >= 2 && props.loop) {
        moveMax = (props.images.length + 1) * elSize
        return
    }
    moveMax = (props.images.length - 1) * elSize
}
// 初始化位置，索引
function initCoordinate () {
    if (props.images.length >= 2 && props.loop) {
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
    if (props.images.length >= 2 && props.loop) {
        firstOne.value = app.refs.children[0].innerHTML
        lastOne.value = app.refs.children[props.images.length - 1].innerHTML
    }
}
function init () {
    dom = render(app.refs.box)
    setElSize()
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
    dom(coordinate, 0, 1)
}

// 相册放大图片移动图片-------------------------------------------

/***
 * 计算图片最大放大倍数
 */
function calcImage () {
    if (props.images.length <= 0) return
    const item = props.images[props.modelValue]
    item.width = item.width ? item.width : 0 // 保证宽度在
    item.height = item.height ? item.height : 0 // 保证宽度在
    const _isGetWidth = item.width > item.height // 是否图片的宽度比高度大
    const el:any = app.refs.el
    const children = app.refs.children
    domWidth = children[props.modelValue].children[0].offsetWidth
    domHeight = children[props.modelValue].children[0].offsetHeight
    boxHeight = el.offsetHeight
    boxWidth = el.offsetWidth
    if (_isGetWidth) {
        maxMultiple = item.width / domWidth
    } else {
        maxMultiple = item.height / domHeight
    }
}

// 计算照片放大时的最大滑动值
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
        console.log(maxTop, maxBottom)
    }
}

function setTransform () {
    console.log(translateX, translateY)
    const dom = app.refs.img[props.modelValue]
    dom.style.webkitTransform = `translate3d(${translateX}px,${translateY}px, 0px) scale(${scale})`
    dom.style.transform = `translate3d(${translateX}px,${translateY}px, 0px) scale(${scale})`
}

function setTranslate (touches:Touch) {
    const _x = touches.clientX
    const _y = touches.clientY

    translateX += _x - clientX
    if (translateX >= maxLeft) {
        translateX = maxLeft
    }
    if (translateX <= maxRight) {
        translateX = maxRight
    }

    translateY += _y - clientY
    if (translateY >= maxTop) {
        translateY = maxTop
    }
    if (translateY <= maxBottom) {
        translateY = maxBottom
    }
    clientX = _x
    clientY = _y
}

function onLoadImage (item: Item, img:any) {
    if (!item.width) {
        item.width = img.naturalWidth
    }
    if (!item.height) {
        item.height = img.naturalHeight
    }
    item.img = img
    calcImage()
}

// 移动的状态
function moveStatus (type: number) {
    const _coordinate = nowIndex * elSize
    if (scale > minMultiple && type === 4 && coordinate < _coordinate && translateX === maxRight) {
        coordinate = _coordinate
        return 1 // 放大时,并向左滑动时反回1
    }

    if (scale > minMultiple && type === 3 && coordinate > _coordinate && translateX === maxLeft) {
        coordinate = _coordinate
        return 2 // 放大时,并向左滑动时反回1
    }

    if (scale > minMultiple && translateX < maxLeft && translateX > maxRight && type >= 1) {
        coordinate = _coordinate
        return 3
    }
    return 0
}

// 双击放或缩小图片
function onToggleScale () {
    if (scale > minMultiple) {
        scale = minMultiple
    } else {
        scale = maxMultiple
    }
    translateX = 0
    translateY = 0
    distance = 0
    clientY = 0
    clientX = 0
    calcMaxTouch()
    setTransform()
}

function touchstart (e: TouchEvent) {
    // 判断动画是否在进行中, 进行中禁止滑动
    if (isAnimating.value) {
        aniamteend()
    }
    elPositon = app.refs.el.getBoundingClientRect()
    isAnimating.value = false
    touchstartTime = new Date().getTime()
    const _self = e.targetTouches
    if (self.length <= 1) {
        startX = _self[0].pageX
        startY = _self[0].pageY
        clientX = _self[0].clientX
        clientY = _self[0].clientY
        moveX = startX
        moveY = startY
        isTouch = true
        // 计算单击双击
    }
    initX = startX
    initY = startY
    times++
    if (timeout) {
        clearTimeout(timeout)
    }

    if (endtimeout) {
        clearTimeout(endtimeout)
    }
    timeout = setTimeout(() => {
        times = 0
    }, 200)
}

function touchmove (e: TouchEvent) {
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

    const obj = getDirection(moveX, moveY, _x, _y, !!isMove.value)

    if (obj.type >= 1 && isMove.value === 0) {
        isMove.value = 1
    }
    if (moveStatus(obj.type) >= 1) {
        setTranslate(e.touches[0])
        setTransform()
        moveX = _self[0].pageX
        moveY = _self[0].pageY
        return
    }

    if (isMove.value === 1) {
        moveX = _x
        moveY = _y
        e.preventDefault()
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
    // 计算是否双击
    if (e.targetTouches.length <= 0) {
        const _x = e.changedTouches[0].pageX
        const _y = e.changedTouches[0].pageX
        if (timeout) {
            clearTimeout(timeout)
        }
        if (Math.abs(_x - initX) < 2 && Math.abs(_y - initY)) {
            endtimeout = setTimeout(() => {
                if (times >= 1) {
                    console.log('times:'+times)
                }
                if (times >= 2) {
                    onToggleScale()
                }
                times = 0
            }, 200)
        }
    }

    distance = 0
    clientX = 0
    clientY = 0
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

    isTouch = false
    if (isMove.value === 1) {
        isMove.value = 0
        const _now = new Date().getTime()
        const _dis = moveX - startX
        const _isfast = Math.abs(_dis) > 30 && _now - touchstartTime < 300 && scale === minMultiple // 是否快速滑过
        const _isChangePos = Math.abs(coordinate) % elSize // 是否有移动

        if (_isChangePos) {
            isAnimating.value = true
        }

        // 滑动到最小值
        if (coordinate <= 0) {
            coordinate = 0
            nowIndex = 0
            setPostion()
            return
        }

        // 滑动到最大值
        if (coordinate >= moveMax) {
            coordinate = moveMax
            setPostion()
            return
        }
        // 快速滑过

        if ((_isfast && _dis < -20) || isSpeedDir() === 'next') {
            nowIndex++
            coordinate = nowIndex * elSize
            setPostion()
            return
        }

        if ((_isfast && _dis > 20) || isSpeedDir() === 'prev') {
            nowIndex--
            coordinate = nowIndex * elSize
            setPostion()
            return
        }
        coordinate = nowIndex * elSize
        setPostion()
    }
}

onMounted(() => {
    init()
    window.addEventListener('resize', () => {
        winWidth.value = window.innerWidth
    })
})
</script>
