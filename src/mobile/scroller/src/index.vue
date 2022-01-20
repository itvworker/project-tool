<template>
    <div class="it-scroller" ref="el" @touchstart="onTouchstart"  @touchmove="onTouchmove" @touchend="onTouchend">
        <div class="it-scroller-content">
            <div class="it-scroller-touch" ref="elScroller"> 
                <div class="pull-top" v-if="pullDown" ref="elPull">
                    <slot name='pull'>
                        <div class="spinner-holder">
                            
                            <arrow
                                class="arrow"
                                :class="{'active': status}"
                                v-if="!isTriggerPullDown"
                                :fillColor="refreshLayerColor"
                            ></arrow>
                            <spinner v-show="isTriggerPullDown" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}"></spinner>
                            <span
                                class="text"
                                :style="{color: refreshLayerColor}"
                                v-text="text"
                            ></span>
                            
                        </div>
                    </slot>
                </div>

                <div class="itv-scroller-msg">
                    <slot/>
                </div>

                <div class="it-scroller-more" ref="more" v-show='isMore && moreStatus!=="loadingStop"'>
                    <spinner v-show="moreStatus !== 'none'" class="it-scroller-more-icon" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}" />
                    <span v-show="moreStatus === 'none'">{{noDataText}}</span>
                    <span v-show="moreStatus !== 'none'">{{loadingText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Arrow from './components/Arrow.vue'
import Spinner from './components/Spinner.vue'
import { withDefaults, defineProps, ref, onMounted, defineEmits, nextTick, defineExpose} from 'vue'
import render from '../../../libs/render';
import getDirection from '../../../libs/touch';
const props = withDefaults(defineProps<{
    isMore?: boolean,
    topBounce?: boolean,
    bottomBounce?: boolean,
    leftBounce?: boolean,
    rightBounce?: boolean,
    pullDown?: boolean,
    pullDis?: number,
    percent?: number,
    speed?: number,
    showScrollBar?: boolean,
    scrollYel?: boolean,
    scrollXel?: boolean,
    refreshLayerColor?: string
    loadingLayerColor?: string,
    pullText?: string,
    loseenText?: string
    refreshText?: string,
    loadingText?: string,
    noDataText?: string,
    maxSpeed?: number,
    divisor?: number
    isProvide?: boolean,
    isInject?: boolean,
    testKey?: boolean,
    minScrollHeihgt?: number,
    pattern?: string,
}>(), {
    isMore: false, // 是否开启加载更多 开启此功能需开启 bottomBounce
    topBounce: false, // 上弹动
    bottomBounce: false, // 下弹动
    leftBounce: false, // 左弹动
    rightBounce: false, // 右弹动
    pullDown: false, // 下拉刷新
    pullDis:  60, // 上新刷新触发距离
    percent: 0.98,
    speed: 100,
    //是否黒示滚动条
    showScrollBar: false,
    //开启随y轴滚动dom
    scrollYel: false,
        //开启随X轴滚动dom
    scrollXel: false,
    refreshLayerColor: "#AAA",

    loadingLayerColor: "#AAA",
    pullText: '下拉刷新',
    loseenText: '松开刷新',
    refreshText: '更新中',
    loadingText: "加载中…",
    noDataText: "没有更多数据",
    maxSpeed: 100,
    /**除数，控制计算速度 */
    divisor: 5,
    isProvide: false,
    isInject: false,
    testKey: false,
    minScrollHeihgt: 0,
    /**
     * 滑动模式
     * freedom x轴，y轴可自由滚动, 
     * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
     * vertical竖向滚动，
     * horizontal横向滚动
     */
    pattern: 'vertical'
})

/***  让父组件调用的方法  */
function refresh() {
    if(scrollY < 0) {
        scrollTo(scrollX, 0, 1.5);
    }
    isTriggerPullDown.value = false
    nextTick(()=>{
        calcMax()
    })  
}
//是否触发上拉加载

function infinite(value:boolean) {
    if(value) {
        moreStatus.value = 'none';
    }else{
        moreStatus.value = 'loadingStop'; 
    }
    nextTick(()=>{
        calcMax()
    })  
}

function setPosition(x:number, y:number) {
    x = x;
    y = y;
    scrollX =x;
    scrollY = y;
    scrollTo(scrollX, scrollY, 0)
}
function getPosition() {
    return {
        x: scrollX,
        y: scrollY
    }
}
defineExpose({
    refresh,
    infinite,
    setPosition,
    getPosition
})

const emit = defineEmits(['scroll', 'infinite', 'stop', 'refresh']) // 注册事件
const el = ref() // 父el
const elScroller= ref() 
const elPull = ref()
const moreStatus = ref<string>('loadingStop')
const isTriggerPullDown =  ref<boolean>(false) // 是否触发了下新刷新


let maxX:number = 0;
let maxY:number = 0;
let moveX = 0;
let moveY = 0;
let contentHeight = 0
let contentWidth = 0
let elPositon = {
    left: 0,
    top:0,
    bottom: 0,
    right: 0
};
let scrollX = 0;
let scrollY = 0;
let x = 0;
let y = 0;
let pullDownPoint:number = 0 //下拉加载的触发点 
let scrollRender:(left: number, top: number, zoom: number)=>void;
let direction: string | null = null;
let cacheDirection: string | null = null;
let isTouch = true;
let startX = 0;
let startY = 0;
const touchMoveList:{x: number, y: number,time: number}[] = [];
onMounted(()=>{
    scrollRender = render(elScroller.value);
    calcMax();
})
/**
 * 计算滚动的最大值
 */
function calcMax() {
    let parent = elScroller.value.parentNode;
    let child =  elScroller.value;
    let parentWidth = parent.clientWidth;
    let parentHeight = parent.clientHeight;
    let childWidth = child.clientWidth;
    let childHeight = child.clientHeight;

    maxX = Math.max(0, childWidth - parentWidth);
    maxY = Math.max(0, childHeight - parentHeight);

    if(props.minScrollHeihgt > maxY) {
        maxY = props.minScrollHeihgt
    }
    contentHeight = parentHeight;
    contentWidth = parentWidth;
    elPositon = el.value.getBoundingClientRect();
  
    // 当滚动值超过最大值时，恢复到最大值
    if(scrollX > maxX) {
        scrollX =  maxX;
        x = maxX
    }
    
    if(scrollY > maxY) {
        scrollY =  maxY;
        y =  maxY
    }

    scrollRender(scrollX , scrollY, 1);
    changeScrollY();
    // //计算下拉加载触发点
    if(props.pullDown) {
        pullDownPoint =  -elPull.value.clientHeight
    }

}

function isVertcialMove():boolean {
    return (props.pattern === 'vertical' || props.pattern === 'auto') && direction === 'vertical'
}
/**
 * 判断是否横向滑动
 */
function isHorizontalMove() {
    return (props.pattern === 'horizontal' || props.pattern === 'auto') && direction === 'horizontal'
}

//是否触发上拉加载
function loadingData(value:number):void {
    if(props.isMore && value >= maxY && moreStatus.value ==='loadingStop') {
        moreStatus.value = 'loading';
        emit('infinite')
        nextTick(()=>{
            calcMax()
        })
    }
}


/** 滚动动画的逻辑 */
/**
 * 滚动到指定位置
 * @param {Number} x 
 * @param {Number} y 
 * @param {Nubmer} value 速度倍数 
 */
let stepX = 0 //动画每步的时速度的变化值
let stepY = 0 //动画每步的时速度的变化值
let upOrDown = ''
let leftOrRight = ''
let scrollToX:number|null = 0;
let scrollToY:number|null = 0;
const stopStep:number = 2
function scrollTo(_x:number, _y:number, _value:number=1) {
    scrollToX = _x;
    scrollToY = _y;
    let _dx = scrollX - x;
    let _dy = scrollY - y;
    stepY = _dy > 0? calcStep(_dy):-calcStep(_dy)
    stepX = _dx > 0? calcStep(_dx):-calcStep(_dx)
    stepX*= _value
    stepY*= _value
    
    if(_x === x && stepX === 0) {
        direction ="vertical"
    }

    if(_y === y && stepY === 0) {
        direction ="horizontal"
    }
    if(stepY<0){
        upOrDown = 'up'
    }else{
        upOrDown = 'down'
    }

    if(stepX<0){
        leftOrRight = 'left'
    }else{
        leftOrRight = 'right'
    }

    window.requestAnimationFrame(step);                 

}

//滚动动画
function step() {
    let _continuing = true;
    if (isTouch) return;
    let _scrollX = scrollX - stepX
    let _scrollY = scrollY - stepY
    

    //当快要滚动到指定点的Y轴时
    let arriveY = scrollToY!==null && ((stepY < 0 && _scrollY > scrollToY) || (stepY > 0 && _scrollY < scrollToY)) 
    if(arriveY &&  scrollToY!==null) {
        stepY = 0;
        _scrollY =  scrollToY;
        scrollToY = null;
        _continuing = false;
        
    }

    let arriveX = scrollToX !== null && ((stepX < 0 && _scrollX > scrollToX) || (stepX > 0 && _scrollX < scrollToX)) 
    if(arriveX && scrollToX !== null) {
        stepX = 0;
        _scrollX = scrollToX;
        scrollToX = null;
    }

    //当是指定滚动到某一点时
    if(stepY > 0 && scrollToY!==null &&_scrollY < scrollToY) {
        stepY = 0;
        _scrollY = scrollToY;
        scrollToY = null;
    }
    //允许弹动时
    if((_scrollY < 0 && props.topBounce) || (_scrollY >= maxY && props.bottomBounce)) {
        //是否回弹
        let _isBounce = (stepY < 0 && scrollY < 0) || (stepY > 0 && scrollY> maxY);
        if(!_isBounce && _continuing) {
            _scrollY = scrollY - stepY*0.5
            stepY = stepY*0.8
        }
    }
    //不许弹动时
    if(_scrollY < 0 && !props.topBounce) {
        _scrollY = 0
        stepY = 0
    }
    //不许弹动时
    if(_scrollY > maxY && !props.bottomBounce) {
        _scrollY = maxY
        stepY = 0
    }
    //当是指定滚动到某一点时
    if((_scrollX < 0 && props.leftBounce) || (_scrollX >= maxX && props.rightBounce)) {
        //是否回弹
        let _isBounce = (stepX < 0 && scrollX < 0) || (stepX > 0 && scrollX> maxX);
        if(!_isBounce) {
            _scrollX = scrollX - stepX*0.5
            stepX = stepX*0.8
        }
    }

    //不许弹动时
    if(_scrollX < 0 && !props.leftBounce) {
        _scrollX = 0
        stepX= 0
    }
    //不许弹动时
    if(_scrollX > maxX && !props.rightBounce) {
        _scrollX = maxX
        stepX = 0
    }


    if(props.pattern === 'vertical') {
        stepX = 0;
        scrollX = 0;
    }

    if(props.pattern === 'horizontal') {
        stepY = 0;
        scrollY = 0;
    }   
    if(props.pattern === 'auto' && direction === 'vertcial') {
        stepX = 0;
        
    }

    scrollX = _scrollX;
    scrollY = _scrollY;
    
    scrollRender(scrollX , scrollY, 1)
    changeScrollY();
    emit('scroll',{
        x: scrollX,
        y: scrollY,
        stepY: stepY,
        stepX: stepX,
        type: direction,
        maxY: maxY
    })
    stepX = stepX * props.percent
    stepY = stepY * props.percent
    
    
    if(Math.abs(stepX) <= stopStep) {
        stepX = 0
    }
    if(Math.abs(stepY) <= stopStep) {
        stepY = 0
    }
    
    if(stepX===0 && stepY === 0) {
        if(scrollY < 0 && _continuing) {
            scrollTo(scrollToX!==null?scrollToX:0, 0, 1.5)
            return
        }

        if(scrollY > maxY && _continuing) {
            scrollTo(scrollToX!==null?scrollToX:0, maxY, 1.5)
            return
        } 

        if(scrollX < 0 && _continuing) {
            scrollTo(0, scrollToY!==null?scrollToY:0, 1.5)
            return
        }

        if(scrollX > maxX && _continuing) {
            scrollTo(maxX, scrollToY!==null?scrollToY:0, 1.5)
            return
        }
        emit('stop', {
            x: scrollX,
            y: scrollY,
            type: direction,
            maxY: maxY,
            maxX: maxX,
            upOrDown: upOrDown,
            leftOrRight: leftOrRight
        })
        return
    }
    
    
    window.requestAnimationFrame(step)
}



 /**
 * 计滚动到一定距离的stepX,stepY的开始步数
 * @param {Number} distance 
 */
function calcStep(distance: number) {
    let dis = Math.abs(distance);

    if(dis===0) {
        return 0
    }
    let _step = stopStep; 
    let numDis = 0;
    while(numDis<dis) {
        numDis+= _step / props.percent
        _step = _step / props.percent
    }
    _step = _step / props.percent
    return _step
}

//计算touch结束后的滑动速度
function calcMoveSpeed() {
    let _touchList = touchMoveList;

    
    let num = _touchList.length
    if(num > 30) {
        _touchList = _touchList.slice(num-30, num)
    }
    let last = _touchList.length-1;
    let first = 0;
    
    let a = 0;
    for(let i = last; i >= 0; i--) {
        if(_touchList[last].time-_touchList[i].time > props.speed) {
            first = i;
            break
        }
        first = i;
        a++;
    }
    
    if(a < 3) {
        return {
            x: 0,
            y: 0
        }
    }

    let _x = (_touchList[last].x - _touchList[first].x) / props.divisor 
    let _y = (_touchList[last].y - _touchList[first].y) / props.divisor 
    
    if(Math.abs(_x)<2) {
        _x = 0
    }
    if(Math.abs(_y)<2) {
        _y = 0
    }

    if(_y > props.maxSpeed) {
        _y = props.maxSpeed
    }

    if(_y <-props.maxSpeed) {
        _y = -props.maxSpeed
    }

    if(_x > props.maxSpeed) {
        _x = props.maxSpeed
    }

    if(_x <-props.maxSpeed) {
        _x = -props.maxSpeed
    }
    return {
        x: _x,
        y: _y
    }
}

function animate(speed:{x:number, y:number}) {
            
    stepX = speed.x;
    stepY = speed.y;
    if(Math.abs(stepX)<5 || (cacheDirection === 'vertical'  && props.pattern ==='horizontal')) {
        stepX = 0
    }

    if(Math.abs(stepY)<5 || (cacheDirection === 'horizontal'&& props.pattern ==="vertical")) {
        stepY = 0
    }

    if(stepY===0 && stepX === 0) {
        emit('stop',{
            x: scrollX,
            y: scrollY,
            type: direction,
            maxY: maxY,
            maxX: maxX,
            upOrDown: upOrDown,
            leftOrRight: leftOrRight
        })
        return 
    }
    if(stepY<0){
        upOrDown = 'up'
    }else{
        upOrDown = 'down'
    }
        
    if(stepX<0){
        leftOrRight = 'left'
    }else{
        leftOrRight = 'right'
    }
    window.requestAnimationFrame(step)
}


const text = ref<string>('')
const status = ref<number|null>(null)
function changeScrollY() {
    if(isTriggerPullDown.value) {
        text.value = props.refreshText;
        return
    }
    if(isTouch && scrollY < pullDownPoint) {
        text.value = props.loseenText
        status.value = 1
        return
    }

    if(isTouch && scrollY > pullDownPoint) {
        text.value = props.pullText;
        status.value = 0
        return
    }
    
    loadingData(scrollY);
    
}

//  touch 开始事件-------------------------------------------------------
function onTouchstart (e:TouchEvent):void {
    calcMax();
    elPositon = elScroller.value.getBoundingClientRect()
    if (e?.target?.tagName.match(/input|textarea|select/i)) {
        return
    }
    direction = null;
    isTouch = true;
    scrollToX = null;
    scrollToY = null;
    let touches = e.touches;
   
    touchMoveList.splice(0, touchMoveList.length)
    //检查手指数量
    if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
    }
    
    // 两只手指滑动处理中心点
    let isSingleTouch = touches.length === 1;
    if (isSingleTouch) {
        moveX = touches[0].pageX;
        moveY = touches[0].pageY;
    } else {
        moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
    }
    startX = moveX 
    startY = moveY

    touchMoveList.push({
        x: moveX,
        y: moveY,
        time: new Date().getTime()
    })
}

function onTouchmove (e:TouchEvent) {
    e.preventDefault();
   
    if(isTouch ===false) return
    let _touches = e.touches;
    //检查手指数量
    if (_touches.length == null) {
        throw new Error("Invalid touch list: " + _touches);
    }

    // 两只手指滑动处理中心点
    let _moveX, _moveY
    let isSingleTouch = _touches.length === 1;
    if (isSingleTouch) {
        _moveX = _touches[0].pageX;
        _moveY = _touches[0].pageY;
    } else {
        _moveX = Math.abs(_touches[0].pageX + _touches[1].pageX) / 2;
        _moveY = Math.abs(_touches[0].pageY + _touches[1].pageY) / 2;
    }
    
    let _upxy = touchMoveList[touchMoveList.length-1];
    moveX = _upxy.x;
    moveY = _upxy.y;
    if(moveX  < elPositon.left || moveX  > elPositon.right ||  moveY < elPositon.top ||  moveY > elPositon.bottom) {
        onTouchend(e)
        return
    }

    //判断滑动方向，并获取滑动距离
    let res = getDirection(moveX, moveY, _moveX, _moveY, !!direction)
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    if(!res) return
    if((res.type===1 || res.type === 2) && !direction) {
        direction = 'vertical'
        cacheDirection = 'vertical'
    }
    if((res.type===3 || res.type === 4) && !direction) {
        direction = 'horizontal'
        cacheDirection = 'horizontal'  
    }
    if(!direction) return

    
    moveX = _moveX;
    moveY = _moveY;
    touchMoveList.push({
        x: moveX,
        y: moveY,
        time: new Date().getTime()
    })
    /**
     * 滑动模式
     * freedom x轴，y轴可自由滚动, 
     * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
     * vertical竖向滚动，
     * horizontal横向滚动
    */
    
    if (isVertcialMove() || props.pattern === 'freedom') {
        let _scrollY = scrollY - res.angy;

        if (['vertical', 'auto', 'horizontal'].indexOf(props.pattern) >= 0 ) {
            scrollX = 0;
        }
        //允许弹动时
        if((_scrollY < 0 && props.topBounce) || (_scrollY > maxY && props.bottomBounce)) {
            if((scrollY < 0 && res.angy > 0) || (scrollY > maxY && res.angy < 0) ) {
                _scrollY = scrollY - (res.angy*0.5)
            }
        }
        //不许弹动时
        if(_scrollY < 0 && !props.topBounce) {
            _scrollY = 0
        }
        //不许弹动时
        if(_scrollY > maxY && !props.bottomBounce) {
            _scrollY = maxY
        }
        scrollY = _scrollY
    }
    if(isHorizontalMove() || props.pattern === 'freedom' ) {
        
        let _scrollX = scrollX - res.angx;
        if( ['vertical', 'auto', 'horizontal'].indexOf(props.pattern) >= 0 ) {
            scrollY = 0;
        }
        //允许弹动时
        if((_scrollX < 0 && props.leftBounce) || (scrollX > maxX && props.rightBounce)) {
            if((scrollX < 0 && res.angx > 0) || (scrollX > maxX && res.angx < 0) ) {
                _scrollX = scrollX - (res.angx*0.5)
            }
        }
        //不许弹动时
        if(_scrollX < 0 && !props.leftBounce) {
            _scrollX = 0
        }
        //不许弹动时
        if(_scrollX > maxX && !props.rightBounce) {
            _scrollX = maxX
        }
        scrollX = _scrollX;
    }
    scrollRender(scrollX, scrollY, 1);
    changeScrollY();

    emit('scroll',{
        x: scrollX,
        y: scrollY,
        stepX: res.angx,
        stepY: res.angy,
        type: direction,
        maxY: maxY
    })
    loadingData(scrollY)
}

function onTouchend (e:TouchEvent) {
    // 启用自定义调用事件
    if (isTouch===false) return; 
    isTouch = false;
    if (touchMoveList.length<=0) return
    touchMoveList[touchMoveList.length-1].time = new Date().getTime()
    if(direction === 'horizontal') {
        if(props.pattern === 'horizontal') {
            scrollY = 0;
        }

        if(scrollX < 0 ) {
            scrollTo(0, scrollY, 1.5)
            return
        } 

        if(scrollX > maxX) {
            scrollTo(maxX, scrollY, 1.5)
            return
        } 
    }
    if(direction === 'vertical') { 
        if(props.pattern === 'vertical') {
            scrollX = 0;
        }
        if(scrollY < 0 ) {
            if(props.pullDown) {
                //触发下拉刷新事件
                if(!isTriggerPullDown.value && scrollY < pullDownPoint) {
                    isTriggerPullDown.value = true
                    emit('refresh');
                    scrollTo(scrollX, pullDownPoint, 1.5)
                    return
                }

                if(scrollY < pullDownPoint) {
                    scrollTo(scrollX, pullDownPoint, 1.5);
                    return
                }
                
                
            }
            
            scrollTo(scrollX, 0 ,1.5)
            return
        } 

        if(scrollY > maxY) {
            scrollTo(scrollX, maxY, 1.5)
            return
        } 
    }
    let speed = calcMoveSpeed();
    animate(speed); 
           
}
</script>