<template>
    <div class='itv-banner' @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchend" >
        <div class="itv-banner-touch" @transitionend="aniamteend" :style="position"  ref="box" :class="['itv-banner-flex-'+direction, {'itv-banner-animating':isAnimating} ]" >
             <slot></slot>
        </div> 
    </div>
</template>
<script>
import render  from  '../../libs/render'
import getDirection from '../../libs/touch'
let dom;
export default {
    props: {
        //是否自动播放
        autoplay: {
            type: Boolean,
            default: false
        },
        //是否循环
        loop: {
            type: Boolean,
            default: false
        },
        /** 高度类型，auto自动最高子元素的高度
         *  now 为当前页的元素高度
        **/
        heightType: {
            type: String,
            default: 'auto'
        },
        direction: {
            type: String,
            default: 'row'
        },
        index: {
            type: Number,
            default: 0
        },
        
    },
    data() {
        return  {
            isAnimating: false, //动画是否在进行中，
            touchstartTime:0, //touchstart开始的时间戳 
            startX: 0, //touchstart的开始接触点
            startY: 0, //touchstart的开始接触点
            moveX: 0, //touch记录上次手指接触点
            moveY: 0, //touch记录上次手指接触点
            isTouch: false, //手指是否接触了屏幕
            elWidth:'',
            nowIndex: 0,
            coordinate: 0,
            isMove: false,//是否在滑动
            number: 0 //字元素张数
        }
    },
    computed: {
        position() {
            if(this.direction === 'row') {
                return ` transform: translateX(${this.nowIndex*this.elWidth})`
            }

            if(this.direction === 'colume') {
                return ` transform: translateY(${this.nowIndex*this.elHeight})`    
            }
        }
    },
    methods: {
        aniamteend() {

        },
        touchstart(e) {
            console.log('start----------');
            //判断动画是否在进行中, 进行中禁止滑动
            if (this.isAnimating) return
            this.touchstartTime= new Date().getTime()
            let self = e.targetTouches
            console.log(self.length);
           
            if (self.length <= 1) {
                this.startX = self[0].pageX
                this.startY = self[0].pageY
                this.moveX = this.startX
                this.moveY = this.startY
                this.isTouch = true
            
            }
        },
        touchmove(e) {
             
            if (!this.isTouch) {
                return false
            }
           
            let self = e.targetTouches
            let x = self[0].pageX
            let y = self[0].pageY
             
            let obj = getDirection(this.moveX, this.moveY, x, y)

        
            if(this.direction === 'row' && obj.type > 2 && !this.isMove) {
                this.screenType = 'progress'
                this.isMove = true
            }

            if(this.direction === 'cloume' && obj.type >= 1 && obj.type <= 2 && !this.isMove) {
                this.screenType = 'vertical'
                this.isMove = true
            }

           
            if (this.screenType) {
                e.preventDefault()
                e.stopPropagation()
            }

            if (obj.type > 0 && this.isMove) {
                //   e.preventDefault();
                
                this.moveX = x
                this.moveY = y
                //是否滑动到小值
                let isMin = this.number >1 && !this.loop && this.coordinate > 0 && obj.angx > 0;
                let isMinone  = this.number<=1 && this.coordinate > 0 && obj.angx > 0; 
                //是否滑动到大值
                let isMax = this.number >1 && !this.loop && this.coordinate < -this.number*this.elWidth && obj.angx<0;;
                let isMaxone  = this.number<=1 && this.coordinate < -this.number*this.elWidth && obj.angx<0; 
                
                console.log(this.coordinate);
                console.log(isMin);

                switch (this.screenType) {
                    case 'vertical':
                        
                        break
                    case 'progress':
                        
                       
                        if(isMin||isMax || isMinone || isMax) {
                            this.coordinate += obj.angx*0.4;
                        }else{
                            this.coordinate += obj.angx;
                        }   
                        
                        dom(-this.coordinate,0,1)

                        break
                }
            }
        },
        touchend(e) {
            if (this.isMove) {
                e.preventDefault()
                e.stopPropagation()
            }

            this.isTouch = false
            this.isMove = false
            let screenType = this.screenType
            this.screenType = ''
            let self = e.targetTouches
            switch (screenType) {
                case 'vertical':
                    
                    break
                case 'progress':
                    e.preventDefault()
                    e.stopPropagation()

                    let now = new Date().getTime()
                    let dis = this.moveX - this.startX
                    let isfast = Math.abs(dis) > 30 && now - this.startTime < 300 //是否快速滑过
                    
                
                    
                    
                    // this.nowIndex++
                    // this.isAnimating = true
                    // this.coordinate = -this.nowIndex * this.elWidth;
                    // dom(-this.coordinate, 0 , 1)
                default:
            }
        },
        //设置父元素的高度
        setElHeight() {
            if(this.heightType ===  'auto' && this.direction === 'row') return
        },
        cloneDom() {
            if(this.loop === false || this.$children.length <= 1) return
        },
        setElWidth() {
            this.elWidth =  this.$el.clientWidth;
            
        },
        initNumber() {
            this.number = this.$children.length
        },
        init() {
            dom = render(this.$refs.box)
            this.setElWidth()
            this.setElHeight()
            this.initNumber()
        }
    },
    
    mounted() {
       
        this.init()
    }
}
</script>
