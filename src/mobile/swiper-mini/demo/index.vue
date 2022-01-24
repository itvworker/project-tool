<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            swiper-mini
        </div>
        <div class="demo-main">
            <h2>横向</h2>
            <it-swiper-mini :loop="true" @change="row" v-model="rowIndex">
                <it-swiper-mini-item v-for="(item, index) in list" :key="index">
                    <div class="demo-banner" :class="item.className">{{index}}</div>
                </it-swiper-mini-item>
               
                <template #dot>
                    <div class="dot-bar">
                        <div class="dot" v-for="(item, index) in list" :key="index" :class="{'active': rowIndex===index}" @click="change(index)">1</div>
                    </div>
                </template>
                
            </it-swiper-mini>

            <h2>坚向</h2>
            <it-swiper-mini :loop="true" @change="row" v-model="rowIndex" direction="column" class="itv-swpier-height">
                <it-swiper-mini-item v-for="(item, index) in list" :key="index">
                    <div class="demo-banner" :class="item.className">{{index}}</div>
                </it-swiper-mini-item>
               
                <template #dot>
                    <div class="dot-bar">
                        <div class="dot" v-for="(item, index) in list" :key="index" :class="{'active': rowIndex===index}" @click="change(index)">1</div>
                    </div>
                </template>
                
            </it-swiper-mini>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute  } from 'vue-router'
import ItSwiperMini from '../src/index.vue'
import ItSwiperMiniItem from '../src/swiper-mini-item/index.vue'
import '../style/index.scss'
interface Item {
    name: string,
    className: string
}


const router = useRouter()
const route = useRoute()
const rowIndex = ref(2)
const columnIndex = ref(2)
const list = ref<Item[]>([])

function init(index: number) {
    list.value = []
    for(let i = 0; i < index; i++) {
        let className = 'banner-1'
        if(i%2 != 0) {
            className = 'banner-2'
        }
        list.value.push({
            name:"banner"+i,
            className: className
        })
    }
}
function row(e:TouchEvent) {
    console.log(e);
}
function change(index:number) {
    rowIndex.value = index;
}
init(6);

</script>
<style lang="scss" scoped>
.item-demo {
    height: 50px;
    line-height: 50px;
    padding-left: 16px;
    border-bottom: #ddd solid 1px;
}
.header-domo{
    height: 30px;
    background-color: #eee;
    line-height: 30px;
    padding-left: 10px;
}

.banner-1{
    background-color: #eee;
    
}
.banner-2{
    background-color: #ddd;
   
}
.banner-2,.banner-1 {
      height: 200px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 100ipx;   
}
.itv-swpier-height {
    height:200ipx;
    .banner-2,.banner-1{
        height: 200ipx;
    }
}
.dot-bar{
    position: absolute;
    bottom: 20ipx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    .dot{
        width: 8ipx;
        height: 8ipx;
        text-align: center;
        background-color: #fff;
        margin:0 4ipx;
        border-radius: 8ipx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        line-height: 0;
        font-size: 0;
        &.active{
            background-color: #e1251b;
            color: #fff;
        }
    }
    
}
</style>
