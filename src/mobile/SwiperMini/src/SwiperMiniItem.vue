<template>
    <div class="it-swiper-mini-item" ref="el" :style="{'height': swiperHeight+'px'}">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, inject, getCurrentInstance } from 'vue'
interface Props {
    swiperHeight?: number |null
}
withDefaults(defineProps<Props>(), {
    swiperHeight: null
})
const parent:any = inject('children')
const changeItem:any = inject('changeItem')
parent.value.push(getCurrentInstance())
changeItem()
</script>
