<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow" @click="router.go(-1)"></div>
            电梯
        </div>
        <div class="demo-main">
            <it-scroller ref="scroller" class="left">
                <div class="item-btn" @click="onScrollTo(index)" :class="{'active': currentMeun === index}" v-for="(item, index) in list" :key="index" :id="index" @show="onSend" >
                    {{item.title}}
                </div>
            </it-scroller>
            <it-scroller ref="scroller" class="right">
                <it-scroller-evelator ref="evelator" v-for="(item, index) in list" :key="index" :id="index" @show="onSend" >
                    <template #header>
                        <div class="header-domo">{{item.title}} {{index}}</div>
                    </template>
                     <div class="item-demo" v-for="(t, i) in item.children" :key="i">
                        {{t.name}}
                    </div>
                </it-scroller-evelator>
            </it-scroller>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import ItScroller from '../src/index.vue'
import ItScrollerEvelator from '../src/scroller-evelator/index.vue'
import '../style/index.scss'

interface Children {
    name: string,
    time: string | number
}
interface Item {
    title: string,
    children: Children[]
}

const list = ref<Item[]>([])
const evelator = ref()
const currentMeun = ref<number>(0)
const router = useRouter()
const page = getCurrentInstance()
function init () {
    for (let i = 0; i < 30; i++) {
        const children:Children[] = []
        for (let a = 0; a < 20; a++) {
            children.push({
                name: `新联${i}${a}`,
                time: new Date().getTime()
            })
        }
        list.value.push({
            title: `奶茶${i}`,
            children
        })
    }
}

function onScrollTo (index:number) {
    page.refs.scroller.refresh()
    page.refs.evelator[index].scrollItem()
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
