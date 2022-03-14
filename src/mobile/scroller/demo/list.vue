<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow" @click="router.go(-1)"></div>
            列表
        </div>
        <div class="demo-main">
            <it-scroller ref="scroller" @infinite="onInfinite" @refresh="onRefresh" class="right" topBounce pullDown bottomBounce isMore>
                <!-- <template #pull="{status, refresh}">
                    {{status}}
                    {{refresh}}
                </template> -->
                <div class="item-demo" v-for="(item, index) in list" :key="index">
                        {{item.title}}
                </div>
                 <!-- <template #more="{status}">
                    {{status}}
                </template> -->
            </it-scroller>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import ItScroller from '../src/index.vue'
import '../style/index.scss'
interface Item {
    title: string
}

const list = ref<Item[]>([])
const router = useRouter()
const page = getCurrentInstance()
let num = 0
function init () {
    for (let i = 0; i < 30; i++) {
        list.value.push({
            title: `奶茶${num}`
        })
        num++
    }
}

function onInfinite () {
    setTimeout(() => {
        init()
        if (num > 100) {
            page.refs.scroller.infinite(true)
        } else {
            page.refs.scroller.infinite(false)
        }
    }, 1000)
}

function onRefresh () {
    num = 0
    setTimeout(() => {
        list.value = []
        init()
        page.refs.scroller.refresh()
        page.refs.scroller.infinite(false)
    }, 1000)
}

init()
onMounted(() => {
    console.log(page)
})

</script>
<style lang="scss" scoped>
.demo-main {
    display: flex;
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
</style>
