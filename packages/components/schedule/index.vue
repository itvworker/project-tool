<template>
    <div class="slide-calendar" @resize="resize" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="calendar-title">
            {{year}}-{{month}}
        </div>
        <div class="calendar-week-text">
            <div class="week-text-item" v-for="(item, index) in weekText" :key="index">{{item}}</div>
            <div class="week-slide" v-show="showTop"  ref="week"  :style="{ transform: 'translateX('+this.weekX+'px)'}" :class="{animating: isAni}" @transitionend="aniamteend">
                <div class="week-item" >
                    <div class="day-item"  :class="{'day-active':currentValue===item.time}" v-for="(item, index) in prevWeek" :key="item.id">
                        <div class="active">{{item.day}}</div>
                        
                    </div>
                </div>
                <div class="week-item">
                   <div class="day-item" @click="selected(index,item)" :class="{'day-active':currentValue===item.time}"  v-for="(item, index) in nowWeek" :key="item.id">
                       <div class="active">{{item.day}}</div>
                    </div>
                </div>
                <div class="week-item">
                    <div class="day-item" :class="{'day-active':currentValue===item.time}"  v-for="(item, index) in nextWeek" :key="item.id">
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="calendar-box" ref="calendar" :style="{height: slideHeight+'px'}">
            <div class="calendar" ref="slide" :class="{animating: isAni}" @transitionend="aniamteend"  :style="{transform: 'translateX('+this.calendarX+'px)'}">
                <div class="month-item">
                    <div class="day-item"   :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}" v-for="(item, index) in prevMonth" :key="item.id">
                       <div class="active">{{item.day}}</div>
                    </div>
                </div>
                <div class="month-item">
                    <div class="day-item" @click="selectDay(index, item)" :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}" v-for="(item, index) in nowMonth" :key="item.id">
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
                <div class="month-item">
                    <div class="day-item"  :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}" v-for="(item, index) in nextMonth" :key="item.id">
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
            </div>
        </div>
       
        
    </div>
</template>
<script>
import slide from './mixins/slide.js'
import init from './mixins/init.js'
import calendar from './mixins/calendar.js'
import {formatDate} from './libs/too'
export default {
    name: "slide-calendar",
    mixins: [slide, init, calendar],
    props:{
        value:{
            type: String,
            value: formatDate('',"Y/M/D")
        },
        //星期的文字
        weekText:{
            type: Array,
            default:()=>['日','一', '二', '三', '四', '五', '六']
        }
    },
    computed: {
        
    },
    watch: {
        value(n,o) {
            this.currentValue = new Date(formatDate(n,"Y/M/D")).getTime()
        }
    },
    data() {
        return {
            nowMonth: [], //当前月份数组
            prevMonth: [], //上月月份数组
            nextMonth: [], //下月月份数组
            monthIndex:1,
            year: 0,
            month: 0 ,
            elWidth: 0 , //元素的宽度,
            rowHeight:'',
            elHeight:'',
            slideHeight: '',
            calendarHeight: 0,
            nowWeek:[], // 当前星期
            prevWeek:[], //上一星期,
            nextWeek:[], //下一星期
            currentValue: new Date(formatDate(this.value,"Y/M/D")).getTime(),
            currentIndexWeek: 0,
            rows:0,
            showTop: true
            
        }
    },
    methods: {
        selected(index,item) {
            this.currentValue = item.time;
            this.$emit('selected',item);
            this.calcInit(item.year, item.month);
            this.year = item.year;
            this.month = item.month;
            this.currentIndexWeek = index;
            this.findWeekRow(item.time)
        },
        selectDay(index,item) {
            switch (item.type) {
                case 'prev':
                    
                    break;
                case 'next':
                    
                    break;
                default:
                    this.currentValue = item.time;
                    this.$emit('selected',item);
                    this.initWeek(item.year, item.month, item.day, item.week);
                    this.year = item.year;
                    this.month = item.month;
                    this.rows = parseInt(index/7);
                    this.findWeekIndex(item.time)
                    break;
            }
            
        }
        
    }

}
</script>
<style lang="less" scoped>
@import './index.less';
</style>