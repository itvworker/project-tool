<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            scroller
        </div>
        <div class="demo-main">
            
            <div class="link-item" @click="toPage('/demo/scroller/evelator')">
                电梯
                <i class="icon-arrow rotate"></i>
            </div>
             <div class="link-item" @click="toPage('/demo/scroller/produce')">
                外卖列表
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" @click="toPage('/demo/scroller/list')">
                下新刷新
                <i class="icon-arrow rotate"></i>
            </div>
            <div class="link-item" @click="toPage('/demo/scroller/horizontal')">
                横向滚动
                <i class="icon-arrow rotate"></i>
            </div>
            <div class="link-item" @click="toPage('/demo/scroller/freedom')">
                自由滚动
                <i class="icon-arrow rotate"></i>
            </div>

            
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute  } from 'vue-router'
import '../style/index.scss'
interface Item {
    name: string,
    time: number
}

const list = ref<Item[]>([]);
const lists = ref<Item[]>([]);
const scroller = ref();
const router = useRouter()
const route = useRoute()

function init() {
    for(let i = 0; i < 100; i++) {
        list.value.push({
            name: '新联'+i,
            time: new Date().getTime()
        })
    }

    for(let i = 0; i < 10; i++) {
        lists.value.push({
            name: 'elevator'+i,
            time: new Date().getTime()
        })
    }
}

function onSend(value: string | number) {
    console.log(value);
    
}
onMounted(()=>{
    console.log(scroller);
    
})
function onScroll(value:any) {
    
}

function toPage(path:string) {
    router.push({
        path: path
    })
}

function onRefresh() {
    setTimeout(()=>{
        scroller.value.refresh();
        scroller.value.infinite(false);
    },2000) 
}

function onInfinite() { 
    setTimeout(()=>{
        scroller.value.infinite(false)
    },2000) 
}
init()

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
.demo-scroller-fixed{
    width: 80px;
    height: 80px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    position:absolute;
}
.link-item {
    position: relative;
    height: 44px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 14px;
    border-bottom:#eee solid 1px;
    .rotate {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%) rotate(180deg);
    }
}

</style>
