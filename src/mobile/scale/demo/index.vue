<template>
    <div class="demo-root-box" >
        <div class="demo-title-bar">
            <div class="icon-arrow"></div>
            Scale
        </div>
        <div class="demo-main">
            <it-scale :max-width="1000">
                <div class="box-width">
                    而那位琉璃石族的古蓝选手手中长矛抬起，右手握住长矛中段，身上亮起一层奇异的光彩，下一瞬，它手中的长矛就已经投掷而出，长矛在空中闪烁了一下，竟然就那么凭空消失了。

        而这边的大猫却明显感觉到一股巨大的危机感仿佛在瞬间就笼罩在了自己身上。

        消失是什么鬼？

        大猫不敢怠慢，手中重剑抬起，狮虎金罡迸发，刺目的白炽色光芒在身上绽放，下一瞬，它的瞳孔骤然收缩，重剑悍然斩出。

        “当”的一声轰鸣，大猫身上狮虎金罡迸发，先前那消失的长矛已经是反弹而起，但大猫自身却如遭雷击，全身麻痹。一道道电流在它身上流转。

        而就在这时，远处那位琉璃石族的古蓝则是按了一下自己头盔上的一枚银色宝石，下一瞬，它竟是已经凭空挪移到了大猫身前附近，一把接住空中落下的长矛，身形前冲，闪电般向大猫冲击而来。

        此时的大猫正处于身体麻痹状态，但狮虎金罡的强大特性却让它恢复的很快，就在对方那一矛已经到了胸前的时候，它的双眸之中猛然迸发出强烈的光芒，重剑上挑。狮虎金罡爆发。

        “轰——”双方同时后退，大猫再次陷入了全身麻痹，但它的对手也不好受，被狮虎金罡强大的排斥力震荡的后退出十几米开外，双臂发麻。

        这一击不只是大猫自己的力量，还有前一次碰撞中吞噬而来的力量。。再加上狮虎金罡的排斥效果，爆发力强悍。

        但古蓝的恢复明显要比大猫更快，它身上的铠甲化解了大部分冲击力，手中那柄闪电长矛再次脱手飞出，直奔大猫当胸飞去。

        这闪电长矛上附带的闪电麻痹能力实在是太强了，以狮虎金罡的强大先前都不能防御的住，这一次自然也同样是难以防御，而且，闪电长矛在出手的瞬间，甚至会直接消失，化为电芒，瞬闪而至。

                </div>
            </it-scale>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute  } from 'vue-router'
import ItScale from '../src/index.vue'
import '../style/index.scss'
interface Item {
    name: string,
    time: number
}

const list = ref<Item[]>([]);
const lists = ref<Item[]>([]);
const scroller = ref();
const router = useRouter()
const route = useRoute()

function init() {
    for(let i = 0; i < 100; i++) {
        list.value.push({
            name: '新联'+i,
            time: new Date().getTime()
        })
    }

    for(let i = 0; i < 10; i++) {
        lists.value.push({
            name: 'elevator'+i,
            time: new Date().getTime()
        })
    }
}

function onSend(value: string | number) {
    console.log(value);
    
}
onMounted(()=>{
    console.log(scroller);
    
})
function onScroll(value:any) {
    
}

function toPage(path:string) {
    router.push({
        path: path
    })
}

function onRefresh() {
    setTimeout(()=>{
        scroller.value.refresh();
        scroller.value.infinite(false);
    },2000) 
}

function onInfinite() { 
    setTimeout(()=>{
        scroller.value.infinite(false)
    },2000) 
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

.box-width {
    background-color: #eee;
}

</style>
