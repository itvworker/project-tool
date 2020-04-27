<template>
    <itv-container class="page-dialog">
        <itv-header>Scroller</itv-header>
        <itv-main>
            <nut-scroller>
                <scroller-content>
                    <div  class="nut-vert-list-panel">
                        <div class="item" v-for="(item, index) in list" @click="alert(item, index)">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </scroller-content>
                <scroller-content>
                    <div  class="nut-vert-list-panel">
                        <div class="item" v-for="(item, index) in other" @click="alert(item, index)">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </scroller-content>

                <scroller-content>
                    <div  class="nut-vert-list-panel">
                        <div class="item" v-for="(item, index) in news" @click="alert(item, index)">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </scroller-content>
            </nut-scroller>
        </itv-main>

    </itv-container>
</template>

<script>
import nutScroller from './scroller'
import scrollerContent from '../scroller-content'
import "./scroller.less";
export default {
    components: {
        nutScroller,
        scrollerContent
    },
    data() {
        return {
            list:[],
            other: [],
            news: [],
            ismore: false,
            isloading: false
        }
    },
    methods: {
        alert(item, index) {
            alert(item.name+index,)
        },
        createList(value) {
            for(let i = 0; i < value; i++) {
                this.list.push({
                    name:'我是新闻哥'
                })
                this.other.push({
                    name:'你是什么人'
                })
                this.news.push({
                    name:'你想看什么'
                })
            }
        },
        pulldown(e) {
            this.isloading = true;
            setTimeout(() => {
                this.list = [];
                this.createList(100);
                this.isloading  = false;
            }, 3000);
        },
        loadmore() {
            this.isloading = true;
            setTimeout(() => {
                this.createList(20);
                this.isloading = false;
            }, 3000);
        }
    },
    mounted() {
        this.createList(100)
    }

};
</script>

<style lang="less" scoped>
.item {
    height: 60ipx;
    border-bottom: #ddd solid 1px;
    line-height: 30ipx;
    padding: 15ipx;
    box-sizing: border-box;
    font-size: 18ipx;
}
</style>


 