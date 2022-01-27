<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            images-preview
        </div>
        <div class="demo-main">
            <it-images-preview class="it-preview-sw" :loop="true" :images="list" @change="row" v-model="rowIndex" ></it-images-preview>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ItImagesPreview from '../src/index.vue'
import '../style/index.scss'
import b1 from '@/assets/demo/1.jpg'
import b2 from '@/assets/demo/2.jpg'
import b3 from '@/assets/demo/3.jpg'
import b4 from '@/assets/demo/4.jpg'
interface Item {
    src: string,
    width: number,
    height: number,
    loaded: boolean
}
const rowIndex = ref(2)
const list = ref<Item[]>([
    {
        src: b1,
        width: 0,
        height: 0,
        loaded: true
    },
    {
        src: b2,
        width: 0,
        height: 0,
        loaded: true
    },
    {
        src: b3,
        width: 0,
        height: 0,
        loaded: true
    },
    {
        src: b4,
        width: 0,
        height: 0,
        loaded: true
    }
])

function row (e:TouchEvent) {
    console.log(e)
}
function change (index:number) {
    rowIndex.value = index
}
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
