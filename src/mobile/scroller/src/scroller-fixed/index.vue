<template>
    <div class="it-scroller-fixed" ref="el">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import render from '../../../../libs/render';
import { ref, onMounted, onBeforeUnmount, inject, withDefaults, defineProps } from 'vue'
export interface Props {
    top?: number, // 最大日期 精确到天
    left?: number, // 最小日期 精期到日
}
let renderScroller:(left: number, top: number, zoom: number)=>void;
const props = withDefaults(defineProps<Props>(), {
    left: 0,
    top: 0
})
const el = ref();
const initY:any = inject('scrollY');
const initX:any = inject('scrollX');
const parent:any = inject('fixeds');
let id = (Math.random()*100000).toFixed(0)+ (Math.random()*100000).toFixed(0)
parent[id] = scroller;
function scroller(scrollX:number, scrollY:number) {
    renderScroller(-(scrollX+props.left), -(scrollY+props.top), 1)
}

onMounted(()=>{
    renderScroller = render(el.value);
    renderScroller(-(initY+props.left), -(initX+props.top), 1)
})
onBeforeUnmount(()=>{
    delete parent[id]
})
</script>