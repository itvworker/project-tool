<template>
    <div class="it-scroll-evevator" ref="el">
        <div class="it-scroll-evevator-header" ref="header">
            <slot name="header"></slot>
        </div>
        <div class="it-scroll-evevator-body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import render from '../../../../libs/render';
import { ref, onMounted, getCurrentInstance, inject, onBeforeUnmount, defineExpose } from 'vue'
const el = ref()
let top = 0;
let height = 0;
let header:(left: number, top: number, zoom: number)=>void;
let headerHeight = 0;
let maxY = 0;
let y = 0;
const page = getCurrentInstance();

export interface Props {
    id?: number | string, // 最大日期 精确到天
}
let renderScroller:(left: number, top: number, zoom: number)=>void;
const props = withDefaults(defineProps<Props>(), {
    id: 0
})

function init(scrollY?:number) {
    top = el.value.offsetTop;
    height = el.value.clientHeight;
    header = render(el.value.children[0]);
    headerHeight = el.value.children[0].clientHeight;
    maxY = height - headerHeight;
    if(scrollY) {
        scroller(scrollY)
    }
}


const parent:any = inject('evelatorChildren');
const initY:any = inject('scrollY');
const setPosition:any = inject('setPosition')
const emit = defineEmits(['show']) // 注册事件
let id = (Math.random()*100000).toFixed(0)+ (Math.random()*100000).toFixed(0)
parent[id] = {
    scroller: scroller,
    init: init
}
function scroller(scrollY:number) {
    
    if(scrollY > top ) {
        let _y =scrollY-top;
        if(_y>maxY) {
            _y = maxY
        }
        y = _y
        header(0,-y,1)
    }else{
        y = 0
        header(0,-y,1)
    }
    if(scrollY >= top && top+height > scrollY) {
        
        emit('show', props.id)
    }
}

function scrollItem() {
    setPosition(0, top)
}
onMounted(()=>{
    init(initY);
})


onBeforeUnmount(()=>{
    delete parent[id]
})

defineExpose({
    init: init,
    scrollItem: scrollItem,
    top: top
})

</script>