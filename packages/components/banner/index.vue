<template>
    <div class='itv-banner' @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchend" >
        <div class="itv-banner-touch" @transitionend="aniamteend" :style="position"  ref="box" :class="['itv-banner-flex-'+direction, {'itv-banner-animating':isAnimating} ]" >
            <div class="itv-banner-item" v-if="number >=2 && loop === true" v-html="lastOne"></div>    
            <slot></slot>
            <div class="itv-banner-item" v-if="number >=2 && loop === true" v-html="firstOne"></div>    
        </div> 
    </div>
</template>
<script>
import render  from  '../../libs/render'
import getDirection from '../../libs/touch'
import judge from './mixins/judge'
let dom;
export default {
    mixins:[judge],
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
            isMove: 0,// 0为初始状态，1允许滑动，2不允许滑动
            number: 0, //字元素张数
            maxX:0,
            lastOne:'', //循环是复制后一张
            firstOne: '',//循环是复制第一张
            
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
            this.isAnimating = false;
           
        },
        touchstart(e) {
            console.log('start----------');
            //判断动画是否在进行中, 进行中禁止滑动
            if (this.isAnimating) return
            this.touchstartTime= new Date().getTime()
            let self = e.targetTouches
          
           
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

        
            if(obj.type > 2 && this.isMove === 0) {
                this.screenType = 'progress'
                if(this.direction === 'row') {
                    this.isMove = 1
                }else{
                    this.isMove = 2
                }
                
            }

            if(obj.type >= 1 && obj.type <= 2 && this.isMove === 0) {
                this.screenType = 'vertical'
                this.isMove = true
                if(this.direction === 'colume') {
                    this.isMove = 1
                }else{
                    this.isMove = 2
                }
            }

           
            if (this.isMove===1) {
                e.preventDefault()
                e.stopPropagation()
            }

            if (obj.type > 0 && this.isMove===1) {
                //   e.preventDefault();
                
                this.moveX = x
                this.moveY = y
            
                
                console.log(`pos:${this.coordinate}, x:${obj.angx}`);
                

                switch (this.screenType) {
                    case 'vertical':
                        
                        break
                    case 'progress':
                        
                        if(this.isMoveMax(obj.angx)) {
                            this.coordinate += obj.angx*0.4;
                        }else{
                            this.coordinate += obj.angx*0.8;
                        }   
                        
                        dom(-this.coordinate,0,1)

                        break
                }
            }
        },
        touchend(e) {
            if (this.isMove===1) {
                e.preventDefault()
                e.stopPropagation()
            }

            this.isTouch = false
            this.isMove = 0
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
                    let isChangePos = Math.abs(this.coordinate)%this.elWidth; //是否有移动

                    //滑动到最小值
                    if(this.coordinate>=0 && isChangePos) {
                        this.isAnimating = true
                        this.coordinate = 0;
                        dom(this.coordinate, 0, 1)
                        this.$emit('first')
                        return
                    }

                     //滑动到最大值
                    if(this.coordinate <= -this.maxX && isChangePos) {
                        this.isAnimating = true
                        this.coordinate = -this.maxX ;
                        dom(this.coordinate, 0, 1)
                        this.$emit('last')
                        return
                    }

      
                


                    
                    
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
            let number = 0;
            this.$children.forEach(item=>{
                if(item.name === 'itv-banner-item') {
                    number++ 
                }
            })
            this.number = number
            
        },
        calcMax() {
            if(this.number>=2 &&  this.loop) {
                this.maxX = (this.number+2)*this.elWidth
                return
            } 

            this.maxX = this.number*this.elWidth
           
        },
        init() {
            dom = render(this.$refs.box)
            this.setElWidth()
            this.setElHeight()
            this.initNumber()
            this.calcMax()
        }
    },
    
    mounted() {
       
        this.init()
        console.log(this.$children);
    }
}
</script>
