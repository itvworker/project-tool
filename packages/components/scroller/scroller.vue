<template>
    <div class="itv-scroller" ref="out" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)" >
        <div class="itv-scroller-silde" ref="slide"  :style="{width: allWidth+'px'}">
            <div class="itv-scroller-content" ref="main">
                <slot />
            </div>
        </div>

    </div>
</template>

<script>
import render from './libs/render';
import animate from './mixins/animiate'
import dom from './mixins/dom'
export default {
    mixins:[animate, dom],
    props: {
        //手指滑动距离超过多少才能算触发了滑动
        minimumTrackingForScroll:{
            type: Number,
            default: 3
        },
        scrollX:{
            type: Boolean,
            default: false
        },
        scrollY:{
            type: Boolean,
            default: true
        },
        bounching: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return  {
            initialX: 0, //开始接触屏幕时的接触点
            initialY: 0, //开始接触屏幕时的接触点
            isAnimating: false, //是否在执行滚动动画
            isMove: false, //是否处理手指在滑动的情况
            enableScrollX: false,
            enableScrollY: false,
            moveList:[],
            lastMoveX: 0,
            lastMoveY: 0,
            index: 0,
            speedMultiplier: 1, //滑动时滑动的距离倍数，例如滑动了10px,如果是1是就是移动10px,如果是 2就是移动20px
            contentList:[
                {
                    maxScrollY: 0,
                    maxScrollX: 0,
                    y: 0,
                    x:0
                }
            ],
            render: [],
            //滚动动画下一步走的距离
            decelerationVelocityX:0,
            decelerationVelocityY:0,
            minDecelerationVelocityX:0.3,
            minDecelerationVelocityY:0.3,
            maxDecelerationVelocityX:0.3,
            maxDecelerationVelocityY:0.3,

            minDecelerationScrollX: 0,
            minDecelerationScrollY: 0,
            maxDecelerationScrollX: 0,
            maxDecelerationScrollY: 0,

            penetrationDeceleration: 0.03,
            penetrationAcceleration: 0.08,

            //-----
            allWidth: '',
            outerWidth: ''
        }

    },
    methods: {

        touchstart(e) {
            this.render = render(this.$refs.slide.children[this.index]);
            this.calcMax();
            this.isAnimating = false;
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            let touches = e.touches;
            let timeStamp = e.timeStamp;

            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }


            // 两只手指滑动处理中心点
            let currentTouchLeft, currentTouchTop;
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            } else {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }

            this.initialX = currentTouchLeft;
            this.initialY = currentTouchTop;
            this.lastMoveX = currentTouchLeft;
            this.lastMoveY = currentTouchTop;
        },
        touchmove(e) {

            e.preventDefault();

            let touches = e.touches;
            let timeStamp = e.timeStamp;
            var currentTouchLeft, currentTouchTop;

            // 计算基于手指中心的移动
            if (touches.length === 2) {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            } else {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            }

            //当处于滑动情况时
            if(this.isMove) {
                let moveX = currentTouchLeft - this.lastMoveX;
                let moveY = currentTouchTop - this.lastMoveY;

                let x = this.contentList[this.index].x;
                let y = this.contentList[this.index].y;

                if(this.enableScrollY && this.scrollY) {

                    y -= moveY * this.speedMultiplier;
                    this.contentList[this.index].y = y;
                }
                this.lastMoveX = currentTouchLeft;
                this.lastMoveY = currentTouchTop;

                this.moveList.push({
                    x: currentTouchLeft,
                    y: currentTouchTop,
                    timeStamp: e.timeStamp
                });

                this.render(0, y,1);

            }
            //当还未处于滑动情况时
            if(!this.isMove) {
                let distanceX = Math.abs(currentTouchLeft - this.initialX);
                let distanceY = Math.abs(currentTouchTop - this.initialY);
                this.enableScrollY =  distanceY >= this.minimumTrackingForScroll;


                if(this.enableScrollY){
                    this.isMove = true;
                }

                this.moveList.push({
                    x: currentTouchLeft,
                    y: currentTouchTop,
                    timeStamp: e.timeStamp
                })

            }

            if(this.moveList.length > 10) {
                this.moveList.splice(0,1);
            }


        },
        touchend(e) {
            this.isMove = false;
            let timeStamp = e.timeStamp;
            let lastMoveTime =  this.moveList[this.moveList.length-1].timeStamp;

            if(timeStamp-lastMoveTime < 100) {
                let positions = this.moveList;
                let endPos = this.moveList.length - 1;
                let startPos = endPos;

                //计算100ms内，上一点在哪一个触发位置
                for (let i = endPos; i >= 0 && positions[i].timeStamp > (lastMoveTime - 100); i --) {

                    startPos = i;
                }

                if (startPos !== endPos) {
                    var timeOffset = positions[endPos].timeStamp - positions[startPos].timeStamp ;
                    var movedLeft = positions[endPos].x - positions[startPos].x;
                    var movedTop = positions[endPos].y - positions[startPos].y;

                    // Based on 50ms compute the movement to apply for each render step
                    this.decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
                    this.decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
                    console.log(this);
                    this.animate()

                }

            }

        }
    }
}
</script>