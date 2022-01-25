<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow" @click="router.go(-1)"></div>
            电梯
        </div>
        <div class="demo-main">
            <it-scroller ref="scroller">
                <it-scroller-evelator v-for="(item, index) in list" :key="index" :id="index" @show="onSend" >
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
import { ref, onMounted } from 'vue'
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
const router = useRouter()
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

function onSend (value: string | number) {
    console.log(value)
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
