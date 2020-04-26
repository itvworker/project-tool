<template lang="html">
    <page-container>
        <page-header title="物资出厂" @tapLeft="exitApp" ></page-header>
        <page-main>
            <scroller :isLoadingMore="isLoadingMore" :noDataText="isNone?'':'没有更多数据'"  :on-refresh="refresh"  :on-infinite="infinite"  refreshText="下拉刷新" ref="scroller">
                <item v-for="(page,index) in list" :item="page" :key="index" @click="toPage(page.fdFlowId)" ></item>
                <div class="rel-bg-img" v-show="isNone">
                    <img src="~@/assets/images/error-subtip.png">
                    <h4>暂无申请记录</h4>
                </div>
            </Scroller>
        </page-main>
    </page-container>
</template>
<script>
import loadMore from "@/mixins/loadmore";
import item from './item.component'
import base from '@/mixins/page.base'

export default {
    mixins:[loadMore,base],
    components:{
        item
    },
    methods: {
        // 获取申请流程列表
        async getDataList() {
           
            //查看是否只一页
            if(this.page.pageNumber > this.lastPage && this.lastPage>=1) {
                this.$refs.scroller.finishPullToRefresh();
                this.$refs.scroller.finishInfinite(true);
                return;
            }


            let reqData = {
                pageNumber: this.page.pageNumber,
                pageSize: this.page.pageSize
            };
            try {
                let res = await this.$model.getPersonList(reqData);
                this.$pixLoading.close();
                if(res.code ===1) {
                    this.lastPage= res.data.lastPage;
                    this.afterLoad(res.data.list, res.data.pageNum, res.data.lastPage);
                    return
                }

                this.$pixToast.show(res.msg)
            } catch (error) {
                this.$pixLoading.close();
                this.$pixToast.show(error.message);
            }
            
           
            this.afterLoad([], this.page.pageNumber);
        },
        /**
         *
         */
        toPage(id) {
            this.$router.push({
                name:'detail',
                query: {
                    fdFlowId: id
                }
            })
        }
    },
    mounted() {
        this.init();

        

    }
}
</script>

<style lang="less" scoped>

.rel-bg-img {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
        width: 125rpx;
    }
    h4 {
        text-align: center;
        margin-top: 30rpx;
        color: #999;
        font-size: @fs-large;
        font-weight: normal;
        color: @color-primary;
    }
}


</style>
