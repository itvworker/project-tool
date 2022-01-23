<template>
    <div class='it-swpier' :style="{'height': swiperHeight+'px'}" @resize="resize" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchend" >
        <div class="it-swpier-touch" @transitionend="aniamteend"   ref="box" :class="['it-swpier-flex-'+direction, {'it-swpier-animating':isAnimating, 'it-move-anmiating':isMove===1} ]" >
            <div class="it-swpier-item" v-if="number >=2 && loop === true" v-html="lastOne"></div>    
            <slot></slot>
            <div class="it-swpier-item" v-if="number >=2 && loop === true" v-html="firstOne"></div>    
        </div> 
        <slot name="dot"></slot>
    </div>
</template>
<script lang="ts" setup>
import render  from  '../../../libs/render'
import getDirection from '../../../libs/touch'
import { withDefaults, defineProps, watch, ref, onMounted, defineEmits, nextTick, defineExpose, provide} from 'vue'
interface Props {
    value: number
    //是否循环
    loop: boolean,
    //row为横向，column为纵向
    direction: string,
    bounce: boolean,
    /**
     * 向下或向右滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
     */
    beginBounce: boolean,
    swiperHeight: number | null,
    /**
     * 向上或向左滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
     */
    endBounce: boolean
}
const props = withDefaults(defineProps<Props>(), {
    value: 0,
    //是否循环
    loop: false,
    //row为横向，column为纵向
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
    endBounce: false
})




let isAnimating = false //动画是否在进行中，
let touchstartTime = 0 //touchstart开始的时间戳 
let startX = 0 //touchstart的开始接触点
let startY: 0 //touchstart的开始接触点
let moveX: 0 //touch记录上次手指接触点
let moveY: 0 //touch记录上次手指接触点
let isTouch = false //手指是否接触了屏幕
let elSize = 0 //元素的高或宽
let nowIndex = 0 //当有滚动的张数
let intialIncex=0 //初始化是第一张的索引
let intialLastIndex= 0 //初始化是后一张的索引
let coordinate= 0 //滑动值
let initialCoordinate= 0//上一次的位置
let isMove= 0// 0为初始状态，1允许滑动，2不允许滑动
let number= 0 //子元素张数
let moveMax=0 //滑动的最大值
let lastOne=''  //循环是复制后一张
let firstOne= '' //循环是复制第一张
let children = []
let dom=''
let winWidth = ref<number>(window.innerWidth) 
let elPositon:any = {}

const emit = defineEmits(['input', 'change', 'stop', 'refresh']) // 注册事件

watch(winWidth, (n, o)=>{
    nextTick(()=>{
        esize()
    })
})
watch(props.value, (n:number, o:number)=>{
    let _coordinate = n*elSize;
    if(props.isLoop) {
        _coordinate = ( n + 1)*elSize;
    }

    if(_coordinate === coordinate) {
        return
    }
    
    scrollTo(n, true);
})

//滚动到第几张,带动画
function scrollTo(_value:number, _isAnimate: boolean) {
    if(_value < 0 || _value >= number) return
    isAnimating = !!_isAnimate;
    nextTick(()=>{
        if(props.isLoop) {
            nowIndex = _value + 1
            return
        }else {
            nowIndex = _value;
        }
        coordinate = nowIndex*elSize;
        setPostion();
        emit('input', _value)
        emit('change', _value)
    })
    
}

function aniamteend() {
    isAnimating = false;
    if(props.isLoop && nowIndex === 0) {
        coordinate = number*elSize
        nowIndex = number
    }

    if(props.isLoop && nowIndex > number) {
        coordinate = elSize
        nowIndex = 1;
        
    }

    if(props.isLoop) {
        emit('change', nowIndex-1)
        emit('input', nowIndex-1)
        setPostion()
        return
    }
    
    emit('change', nowIndex)
    emit('input', nowIndex)
    
}


function clone() {
    if(props.loop === false || this.$children.length <= 1) return
}
//设置box的高或宽
function setElSize() {
    if(this.direction==='row'){
        elSize =  this.$el.clientWidth;
        return
    }
    elSize =  this.$el.clientHeight;
    this.elPositon = this.$el.getBoundingClientRect()
    
}
//初始box的数量
function initNumber() {
    let number = 0;
    this.children = []
    this.$children.forEach(item=>{
        if(item.name === 'it-swpier-item') {
            number++
            this.children.push(item)
        }
    })
    this.number = number
}
//计算
function calcMax() {
    if(this.number>=2 &&  props.loop) {
        this.moveMax = (this.number+1)*elSize
        return
    } 
    this.moveMax = (this.number-1)*elSize
}
//初始化位置，索引
function initCoordinate() {
    if(this.number>=2 &&  props.loop) {
        this.intialIndex = 1
        this.intialLastIndex = this.number
        this.nowIndex = this.value + 1
        this.coordinate = this.nowIndex*elSize
        this.setPostion()
        return
    } 
    this.intialIndex = 0
    this.nowIndex = this.value;
    this.coordinate = this.nowIndex*elSize
    this.setPostion()
    this.intialLastIndex = this.number-1;
    
}
function clone() {
    if(this.number>=2 &&  props.loop) {
        this.firstOne = this.children[0].$el.innerHTML
        this.lastOne = this.children[this.children.length-1].$el.innerHTML 
        return
    } 
}
function init() {
    this.dom = render(this.$refs.box)
    this.setElSize()
    this.setElHeight()
    this.initNumber()
    this.calcMax()
    this.initCoordinate();
    this.clone();
}
function resize() {
    this.setElSize()
    this.calcMax();
    this.coordinate = this.nowIndex*elSize;
    this.setPostion();

}

function setPostion() {
    if(this.direction === 'row'){
        this.dom(this.coordinate, 0 , 1)
        return
    }
    this.dom(0, this.coordinate, 1)
}


function touchstart(e) {
    
    //判断动画是否在进行中, 进行中禁止滑动
    if (this.isAnimating) return
    this.elPositon = this.$el.getBoundingClientRect()
    this.isAnimating = false;
    this.touchstartTime= new Date().getTime()
    let self = e.targetTouches
    this.$emit('touchstart')

    if (self.length <= 1) {
        this.startX = self[0].pageX
        this.startY = self[0].pageY
        this.moveX = this.startX
        this.moveY = this.startY
        this.isTouch = true
    }
}

function touchmove(e) {
    if (!this.isTouch) {
        return false
    }
    
    let self = e.targetTouches
    let x = self[0].pageX
    let y = self[0].pageY
    e.preventDefault()
    let positon = this.elPositon
    if(x < positon.left || x > positon.right ||  y < positon.top ||  y > positon.bottom) {
        this.touchend(e)
        return
    }
        
    let obj = getDirection(this.moveX, this.moveY, x, y, this.screenType)
    
    
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
        if(this.direction === 'column') {
            this.isMove = 1
        }else{
            this.isMove = 2
        }
    }

    
    if (this.isMove===1) {
        e.preventDefault()
        // e.stopPropagation()
    }

    if (obj.type > 0 && this.isMove===1) {
        //   e.preventDefault();
        
        this.moveX = x
        this.moveY = y
    
        switch (this.screenType) {
            case 'vertical':
                if(this.isMoveMax(obj.angy)) {
                    let post = this.coordinate - obj.angy*0.4;
                    this.coordinate = post
                    
                }else{
                    
                    if((this.beginBounce && obj.type === 2 && this.coordinate < this.nowPosition)||(this.endBounce && obj.type === 1 && this.coordinate > this.nowPosition)) {
                        this.coordinate -= obj.angy*0.4;
                    }else{
                        this.coordinate -= obj.angy;
                    }
                    
                }
                
                    

                break
            case 'progress':
                
                
                if(this.isMoveMax(obj.angx)) {
                
                    // this.coordinate -= obj.angx*0.4;
                        let post = this.coordinate - obj.angx*0.4;
                    this.coordinate = post
                }else{
                    
                    // this.coordinate -= obj.angx;
                    
                    if((this.beginBounce && obj.type === 4 && this.coordinate < this.nowPosition)||(this.endBounce && obj.type === 3 && this.coordinate > this.nowPosition)) {
                        this.coordinate -= obj.angx*0.4;
                    }else{
                        this.coordinate -= obj.angx;
                    }
                }   
                break
        }

        if(!this.bounce) {
            if(this.coordinate<=0) {
                this.coordinate = 0;
            }
            if(this.coordinate >= this.moveMax) {
                this.coordinate = this.moveMax;
            }

            if(this.coordinate > this.moveMax || this.coordinate<=0) {
                
            }
        }
        this.setPostion()
    }
}
function touchend(e) {
    this.$emit('touchend')
    this.isTouch = false
    this.isMove = 0
    let screenType = this.screenType
    this.screenType = ''
    let self = e.targetTouches
    if (screenType) {
            
            let now = new Date().getTime()
            let dis = this.moveX - this.startX
            if(this.direction === 'column') {
                dis = this.moveY - this.startY
            }
            
            
            let isfast = Math.abs(dis) > 20 && now - this.touchstartTime < 300 //是否快速滑过
            let isChangePos = Math.abs(this.coordinate)%elSize; //是否有移动
            
            if(isChangePos){
                this.isAnimating = true
            } 

            //滑动到最小值
            if(this.coordinate<=0) {
                this.coordinate = 0;
                this.nowIndex = 0
                this.setPostion()
                this.$emit('first') 
                return
            }
                
                //滑动到最大值
            if(this.coordinate >= this.moveMax) {
                this.coordinate = this.moveMax;
                this.setPostion()
                this.$emit('last') 
                return
            }
            //快速滑过
                
                
            if((isfast && dis<-20) || this.isSpeedDir()==='next') {
                if(!this.endBounce) {
                    this.nowIndex++;
                }
                
                this.coordinate = this.nowIndex*elSize;
                this.setPostion() 
                return    
            }

            if((isfast && dis>20)||this.isSpeedDir()==='prev') {
                if(!this.beginBounce) {
                    this.nowIndex--;
                }
                
                this.coordinate = this.nowIndex*elSize
                this.setPostion()     
                return
            }
        
            this.coordinate = this.nowIndex * elSize;
            this.setPostion()
    }
}
       

init()
window.addEventListener('resize', ()=>{
    this.winWidth = window.innerWidth
})       
export default {
    name: "it-swiper",
  
   
   
    watch: {
         winWidth() {
            this.$nextTick(()=>{
                 this.resize();
            })
           
        },
        value(n, old) {
            let coordinate = n*elSize;
            if(props.isLoop) {
                coordinate = ( n + 1)*elSize;
            }

            if(coordinate === this.coordinate) {
                return
            }
           
            this.scrollTo(n, true);
            
        }
    },
    computed: {
        oneSize() {
            
        }
    },
    methods: {
        
    },
    
    mounted() {
        

    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/it-theme.less';
@import 'it-swiper.less';
</style>
