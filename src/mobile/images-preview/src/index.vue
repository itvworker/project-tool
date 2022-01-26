<template>
    <it-swiper-mini class="it-images-preview" v-model="rowIndex" :disabled="disabled ">
        <it-swiper-mini-item v-for="(item, index) in images" :key="index+item.src" @touchmove="onTouchmove" @touchend="onTouchend">
            <it-scale :maxWidth="item.width" :maxHeight="item.height" @toggle="onToggle" :disabled="disabledScale">
                <img :src="item.loaded!==false?item.src:''" ref="image"  class="it-images-preview-item" @load="onLoad($event, item, $refs.image[index])" />
            </it-scale>
        </it-swiper-mini-item>
    </it-swiper-mini>
</template>
<script lang="ts" setup>
import ItSwiperMini from '../../swiper-mini/src/index.vue'
import ItSwiperMiniItem from '../../swiper-mini/src/swiper-mini-item/index.vue'
import ItScale from '../../scale/src/index.vue'
import { defineProps, defineExpose, withDefaults, watch, ref, getCurrentInstance, onMounted } from 'vue'
interface Image{
    src:string, // 图片路径
    width?: number, // 图片放大的宽度
    height?: number, // 图片放大的高度
    loaded?: boolean // 图片是否加载 当异步加载图片时使用
}
interface Props {
    images: Image[]
}
const rowIndex = ref(0)
const disabled = ref(false)
const disabledScale = ref(false)
const props = withDefaults(defineProps<Props>(), {
    sync: false,
    images: () => []
})

function onLoad (e:Event, item: Image, dom:any) {
    item.width = dom.naturalWidth
    item.height = dom.naturalHeight
}

function onToggle (value: boolean) {
    disabled.value = value
}

function onTouchmove () {
    if(!disabledScale.value) {
        disabledScale.value = true
    }
    
}
function onTouchend (e:TouchEvent) {
    if (e.targetTouches.length === 0) {
        disabledScale.value = false
    }
}
</script>
