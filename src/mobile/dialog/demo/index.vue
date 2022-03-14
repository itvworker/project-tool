<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            Dialog
        </div>
        <div class="demo-main">
            <div class="link-item" @click="open('center')">
                中间弹出
                <i class="icon-arrow rotate"></i>
            </div>
            <div class="link-item" @click="open('left')">
                左边弹出
                <i class="icon-arrow rotate"></i>
            </div>
            <div class="link-item" @click="open('right')">
                右边弹出
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" @click="open('top')">
                上边弹出
                <i class="icon-arrow rotate"></i>
            </div>

            <div class="link-item" @click="open('bottom')">
                下边弹出
                <i class="icon-arrow rotate"></i>
            </div>
            <it-dialog v-model="visible" :dir="dir">
                <div :class="`it-dialog-demo-${dir}`">
                    你是人类吗
                </div>
            </it-dialog>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ItDialog from '../src/Dialog.vue'
import '../style/Dialog.scss'

const visible = ref<boolean>(false)
const dir = ref<string>('left')
function open (value: string) {
    dir.value = value
    visible.value = true
}
</script>
<style lang="scss" scoped>
.it-dialog-demo-center{
    background-color: #fff;
    width: 200px;
    height: 100px;
}

.it-dialog-demo-left, .it-dialog-demo-right{
    background-color: #fff;
    width: 200px;
    height: 100%;
}
.it-dialog-demo-top,.it-dialog-demo-bottom {
    width: 100%;
    height: 200px;
    background-color: #fff;
}
</style>
