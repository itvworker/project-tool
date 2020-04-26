<template lang="html">
      <vuk-container class="vuk-scroller-tab" ref="tabout"   :style="{height:height}">
        <div class="vuk-scroller-tab-group">
            <button @click="tabIndex=1">1</button>
            <button @click="tabIndex=2">2</button>
            <button @click="tabIndex=3">3</button>
        </div>
        <vuk-main>
            <vuk-scroller type="tab" v-show="tabIndex===1"  :blockHeight="0"  :parent="parent"  :bouncing="false" ref="item">
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
            </vuk-scroller>
            <vuk-scroller type="tab" v-show="tabIndex===2" :blockHeight="0" :parent="parent"  :bouncing="false" ref="item">
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />

            </vuk-scroller>
            <vuk-scroller type="tab" v-show="tabIndex===3" :blockHeight="0" :parent="parent"  :bouncing="false" ref="item">

                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />
                <img src="@/assets/images/b3.jpg"  />
                <img src="@/assets/images/b1.jpg"  />
                <img src="@/assets/images/b2.jpg"  />

            </vuk-scroller>

        </vuk-main>
    </vuk-container>
</template>

<script>
import VukScroller from '@/packages/vue-scroll/components/scroller';
export default {
    props: {
        status: {
            type: Number,
            default: 2
        },
        parent: ''
    },
    components: {
        VukScroller
    },
    data() {
        return {
            height: '0px',
            tabIndex: 1
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.height = this.$refs.tabout.$el.parentNode.parentNode.offsetHeight + 'px';
        }
    }
}
</script>

<style lang="less">
.vuk-scroller-tab{
    height: 100%;
    min-height: 100%;

}
.vuk-scroller-tab-group{
    height: 1.173333rem;
    display: flex;
    button{
        flex: 1;
    }
}
</style>
