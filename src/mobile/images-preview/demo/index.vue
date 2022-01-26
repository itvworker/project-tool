<template>
    <div class="demo-root-box" >
        <it-images-preview :images="list"></it-images-preview>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ItImagesPreview from '../src/index.vue'
import b1 from '@/assets/demo/1.jpg'
import b2 from '@/assets/demo/2.jpg'
import b3 from '@/assets/demo/3.jpg'
import b4 from '@/assets/demo/4.jpg'
import '../style/index.scss'
const list = ref<any>([
    {
        src: b1,
        width: 0,
        height: 0
    },
    {
        src: b2,
        width: 0,
        height: 0
    },
    {
        src: b3,
        width: 0,
        height: 0
    },
    {
        src: b4,
        width: 0,
        height: 0
    }
])
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

.box-width {
    background-color: #eee;
}

</style>
