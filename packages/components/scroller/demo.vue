<template>
    <itv-container class="page-dialog">
        <itv-header>Scroller</itv-header>
        <itv-main>
            <nut-scroller
                type="vertical"
                @pulldown="pulldown"
                @loadMore="loadmore"
                :is-un-more="ismore"
                :is-loading="isloading"
            >
                <div slot="list" class="nut-vert-list-panel">
                    <div class="item" v-for="(item, index) in list">
                        {{item.name}}{{index}}---
                    </div>
                </div>
                <div slot="more" class="more">
                        无有更多
                </div>

            </nut-scroller>
        </itv-main>

    </itv-container>
</template>

<script>
import nutScroller from './scroller'
import "./scroller.less";
export default {
    components: {
        nutScroller
    },
    data() {
        return {
            list:[],
            ismore: false,
            isloading: false
        }
    },
    methods: {
        createList(value) {

            for(let i = 0; i < value; i++) {
                this.list.push({
                    name:'我是新闻哥'
                })
            }
        },
        pulldown(e) {
            this.isloading = true;
            setTimeout(() => {
                this.list = [];
                this.createList(20);
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
        this.createList(20)
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


 