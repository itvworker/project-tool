<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            scroller
        </div>
        <div class="demo-main">
            <it-scroller ref="scroller" @scroll="onScroll" @refresh="onRefresh" @infinite="onInfinite" topBounce pullDown isMore bottomBounce>
                <div class="item-demo" v-for="(item, index) in list" :key="index">
                    {{item.name}}
                </div>
            </it-scroller>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ItScroller from '../src/index.vue'
import '../style/index.scss'
interface Item {
    name: string,
    time: number
}

const list = ref<Item[]>([]);
const scroller = ref();
function init() {
    for(let i = 0; i < 100; i++) {
        list.value.push({
            name: '新联'+i,
            time: new Date().getTime()
        })
    }
}
onMounted(()=>{
    console.log(scroller);
    
})
function onScroll(value:any) {
    
    
}

function onRefresh() {
    setTimeout(()=>{
        scroller.value.refresh();
        scroller.value.infinite(false)
    },2000) 
}

function onInfinite() { 
    setTimeout(()=>{
        scroller.value.infinite(true)
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
</style>
