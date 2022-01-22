<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow" @click="router.go(-1)"></div>
            列表
        </div>
        <div class="demo-main">
            <it-scroller ref="scroller" class="horizontal" @infinite="onInfinite" @refresh="onRefresh"  pattern="horizontal">
                <!-- <template #pull="{status, refresh}">
                    {{status}}
                    {{refresh}}
                </template> -->
                <div class="content-list">
                    <div class="item-demo" v-for="(item, index) in list" :key="index">
                        {{item.title}}
                    </div>
                </div>
                
                 <!-- <template #more="{status}">
                    {{status}}
                </template> -->
            </it-scroller>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRouter, useRoute  } from 'vue-router'
import ItScroller from '../src/index.vue'
import ItScrollerEvelator from '../src/scroller-evelator/index.vue'
import ItScrollerFixed from '../src/scroller-fixed/index.vue'
import '../style/index.scss'
interface Item {
    title: string
}
'infinite', 'stop', 'refresh'

const list = ref<Item[]>([]);
const evelator = ref();
const currentMeun = ref<number>(0)
const router = useRouter()
const route = useRoute()
const page = getCurrentInstance();
let num = 0;
function init() {
    for(let i = 0; i < 30; i++) {
        list.value.push({
            title: '奶茶'+num
        })
        num++
    }
}


function onInfinite() {
    setTimeout(()=>{
        init()
        if(num>100) {
            page.refs.scroller.infinite(true);
        }else{
            page.refs.scroller.infinite(false);
        }
        
    },1000)
  
}

function onRefresh(index:number) {
    num = 0;
    
    setTimeout(()=>{
        list.value = [];
        init()
        page.refs.scroller.refresh()
        page.refs.scroller.infinite(false);
    },1000)
}

init()
onMounted(()=>{
    console.log(page);
    
})

</script>
<style lang="scss" scoped>
.demo-main {
    display: flex;
    .horizontal {
        height: 200px;
        margin-top: 16px;
    }
   .left {
       width: 80px;
       box-shadow: 2px 0px 10px rgba(0,0,0, 0.1) ;
    //    background-color: rgba(0,0,0, 0.1)
   }
   .item-btn {
       height: 50px;
       display: flex;
       align-items: center;
       justify-content: center;
       &.active {
           background-color: rgba(0,0,0, 0.1)
       }
   }
}
.content-list {
    display: flex;
    padding: 0 16px;
}
.item-demo {
    height: 200px;
    width: 200px;
    line-height: 50px;
    padding-left: 16px;
    background-color: #eee;
    margin-right: 16px;
    &:last-child {
        margin-right: 0;
    }
}
.header-domo{
    height: 30px;
    background-color: #eee;
    line-height: 30px;
    padding-left: 10px;
}

</style>
