<template lang="html">
    <itv-container>
        <itv-header>Cliper</itv-header>
        <itv-main>
            <div class="itv-demo-btn">
                方形裁剪
            </div>
        </itv-main>
        <itv-container class="cliper-main-box" v-show="toggle">
            <itv-header>Cliper</itv-header>
            <itv-main>
                <itv-cliper ref="cliper" :clipType="clipType"></itv-cliper>
            </itv-main>
            <itv-flex-row>
                <div class="item">重置</div>
                <div class="item">
                    选择图片
                    <input class="select-img" @change="open" type="file" />
                </div>
                <div class="item" @click="done">
                    确认
                </div>
            </itv-flex-row>
        </itv-container>
    </itv-container>

</template>

<script>

import ItvCliper from './cliper.vue'
export default {
    components: {
        ItvCliper
    },
    data() {
        return {
            clipType: 'square',
            toggle: false
        }
    },
    methods: {
        open(event) {

            var files = event.target.files || event.dataTransfer.files
            var reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = e => {
                this.$refs.cliper.getImage(e.target.result);

            }
        },
        done() {
            let result = this.$refs.cliper.done()

        }
    }
}
</script>

<style lang="less">
   @import 'cliper.less';
   .item {
       text-align: center;
       line-height: 44ipx;
       font-size: 16ipx;
       position: relative;
       height: 100%;
       overflow: hidden;
       .select-img{
           position: absolute;
           left: 0px;
           right: 0px;
           height: 100%;
           opacity: 0;
       }
   }
</style>
