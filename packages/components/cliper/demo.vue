<template lang="html">
    <itv-container>
        <itv-header>Cliper</itv-header>
        <itv-main>
          <img :src="url" />
            <div class="itv-demo-btn btn-content" @click="openToggle">
                方形裁剪
            </div>
            <div class="itv-demo-btn btn-content">
                圆形
            </div>

        </itv-main>
        <itv-container class="cliper-main-box" v-show="toggle">
            <itv-header :showArrow="false">
              <div class="btn-close">关闭</div>
              Cliper截图
            </itv-header>
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
            url:'',
            toggle: false
        }
    },
    methods: {
        openToggle(event) {
            this.toggle = true;
        },
        open(event) {
            var files = event.target.files || event.dataTransfer.files
            var reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = e => {
                this.$refs.cliper.getImage(e.target.result);

            }
        },
        done() {
            let result = this.$refs.cliper.done();
            this.url = result;
            this.toggle = false;

        }
    }
}
</script>

<style lang="less">
   @import 'cliper.less';
   .btn-content{
      margin: 10ipx;
   }
   .btn-close{
     position: absolute;
     left: 0px;
     height: 44ipx;
     line-height: 44ipx;
     padding: 0px 10ipx;
     font-size: 14ipx;
   }
   .cliper-main-box {
     position: absolute;
     left: 0px;
     right: 0px;
     bottom: 0px;
     top: 0px;
   }
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
