<template>
    <page-container class="success-page">
        <page-header title="物资出厂" @tapLeft="goback" ></page-header>
        <page-main class="page-main">
            <div class="page-content">
                <div class="detail-bar">
                    <div class="detail-bar-left">  物资类型:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdType}}
                    </div>
                </div>
                 <div class="detail-bar">
                    <div class="detail-bar-left">物料描述:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdName}}
                    </div>
                </div>

                <div class="detail-bar">
                    <div class="detail-bar-left"> 物资编码/品牌规格:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdModel}}
                        
                    </div>
                </div>

                <div class="detail-bar">
                    <div class="detail-bar-left">数量:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdCount}}
                    </div>
                </div>
                <div class="detail-bar">
                    <div class="detail-bar-left">单位(台/件/个):</div>
                    <div class="detail-bar-right">{{pageData.fdUom}}</div>
                </div>

                <div class="detail-bar" >
                    <div class="detail-bar-left">接收人:</div>
                    <div class="detail-bar-right">{{pageData.fdReciver}}</div>
                </div>

                <div class="detail-bar">
                    <div class="detail-bar-left">联系电话:</div>
                    <div class="detail-bar-right">{{pageData.fdPhone}}</div>
                </div>
            </div>    

                
        </page-main>
    </page-container>
</template>

<script>
    import VueQr from 'vue-qr'
    import base from '@/mixins/page.base'
    export default {
        mixins:[ base ],
        components: {
            VueQr
        },
        data(){
            return {
                text: 'vue-qr',
                list:[]
            }
        },
        computed: {
            pageData() {
                return JSON.parse(this.$route.query.data)
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            async getData() {
                try {
                    this.$pixLoading.show('加载中…');
                    let res = await this.$model.getDetail({
                        fdFlowId: this.$route.query.fdFlowId
                    });

                    if(res.code===1) {
                        this.pageData = this.manageData(res.data);
                    }
                    this.$pixLoading.close();
                } catch (error) {
                    
                }
                this.$pixLoading.close();
            },
            manageData(res) {
                if(res.fdApplyDate) {
                    res.fdApplyDate = res.fdApplyDate.split(' ')[0]
                }

                if(res.fdOutDate) {
                    res.fdOutDate = res.fdOutDate.split(' ')[0]
                }

                if(res.fdOutDate) {
                    res.fdReturnDate = res.fdReturnDate.split(' ')[0]
                }

                let all = 0;
                for(let i = 0, l = res.detailList.length; i < l;  i++) {
                    all+=parseInt(res.detailList[i].fdCount);
                }   
                res.all = all;
                this.list = res.detailList;

                return res;
            },
            link(index) {
                this.$router.push({
                    name: 'list',
                    query:{
                        data: JSON.stringify(this.list[index])
                    }
                })
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style lang="less" scoped>
    .page-content{
        padding: 0rpx 15rpx;
        background-color: #fff;
    }
    .detail-bar {
        display: flex;
        font-size: @fs-base;
        padding: 10rpx 0rpx;
        position: relative;
        &::after{     
            content: ' ';
            position: absolute;
            border-bottom: #f1f1f1 solid 1px;
            transform: scaleY(0.5);
            left: 0;
            bottom: 0;
            right: 0;
        }
        .detail-bar-left {
            width: 80rpx;
            color: @color-text-regular;
        }

        .detail-bar-right {
            flex: 1;
        }
    }
    .material-table-title{
        height: 44rpx;
        padding: 0rpx 15rpx;
        font-size: 16rpx;
        line-height: 44rpx;
    }

    .success-page{
        background-color: #f1f1f1;
        
    }
    .page-main{
        padding-bottom: 15rpx;
    }

   
</style>