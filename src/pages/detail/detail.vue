<template>
    <page-container class="page-detail">
        <page-header title="物资出厂" @tapLeft="goBack"></page-header>
        <page-main>
            <div class="detail-card">
                <div class="detail-theme">
                    {{pageData.fdDocreator}}
                </div>
                <div class="detail-content">
                    <div class="detail-bar">
                        <div class="detail-bar-left">申请部门:</div>
                        <div class="detail-bar-right">
                            {{pageData.fdDept}}
                        </div>
                    </div>
                    <div class="detail-bar" v-if="pageData.fdOutDate">
                        <div class="detail-bar-left">出厂日期:</div>
                        <div class="detail-bar-right">{{pageData.fdOutDate.split(' ')[0]}}</div>
                    </div>
                    <div class="detail-bar" v-if="pageData.fdReturnDate">
                        <div class="detail-bar-left">归还日期:</div>
                        <div class="detail-bar-right">{{pageData.fdReturnDate.split(' ')[0]}}</div>
                    </div>
                     <div class="detail-bar" >
                        <div class="detail-bar-left">所属组织:</div>
                        <div class="detail-bar-right">{{pageData.fdUnit}}</div>
                    </div>
                    <div class="detail-bar" >
                        <div class="detail-bar-left">车牌号码:</div>
                        <div class="detail-bar-right">{{pageData.fdCarNo}}</div>
                    </div>
                    <div class="detail-bar" >
                        <div class="detail-bar-left">经办人:</div>
                        <div class="detail-bar-right">{{pageData.fdOperatorName}}</div>
                    </div>
                </div>
                <div class="detail-bottom-bar">
                    <div class="detail-bottom-bar-left">
                       状态：
                        <span class="vm-status" :class="statusClass">
                            {{statusWord}}
                        </span>
                    </div>
                    <div class="detail-bottom-bar-right" @click="openAudit">
                        <div class="btn-check">查看流程</div>
                    </div>
                </div>
            </div>
            
            <div class="flex-box">
                <vue-qr v-if="showCodes" class="qr" :text="'http://midea.com?extra&mc_widget_identifier=com.midea.msd.materialsFactoryDoor&id='+id" :size="400"/>
            </div>
            
        </page-main>
    </page-container>
</template>

<script>
    import VueQr from 'vue-qr'
    import base from '@/mixins/page.base'
    import platform from '@/libs/platform'
    import config from '@/config'
    import Aes from '@/libs/aes.js'
    export default {
        mixins:[ base ],
        components: {
            VueQr
        },
        data(){
            return {
                text: 'vue-qr',
                pageData: {},
                id: ''
            }
        },
        computed: {
            showCodes() {
                //未通过审核是时二维码隐藏
                let status = parseInt(this.pageData.fdStatus);
                if(status!==2) {
                    return false  
                }

                //选择不归还时
                if(this.pageData.finishStatus>=1 & this.pageData.fdIsReturn==='N') {
                    return false
                }

                //选择归还时
                if(this.pageData.finishStatus>=2 & this.pageData.fdIsReturn==='Y') {
                    return false
                }


                //是否当前时间大于或等于出厂日期时
                let now = new Date().getTime()
                let outTime = new Date(this.pageData.fdOutDate.split(' ')[0].replace(/-/ig,'/')).getTime()
                if(now > outTime) {
                    return true
                }

                
                return false
                

            },
            statusClass() {
                let key = parseInt(this.pageData.fdStatus);
                let className = '';
                switch (key) {
                    case 1:
                        className = 'auditing'
                        break;
                    case 2:
                        className = 'pass'
                        break;
                    case 3:
                        className = 'reject';
                        break
                    case 4:
                        className = 'abandon';
                        break            
                    default:
                        break;
                }

                return className;
            },
            statusWord() {
                let key = parseInt(this.pageData.fdStatus);
                let className = '';
                switch (key) {
                    case 1:
                        className = '审核中'
                        break;
                    case 2:
                        className = '已通过'
                        break;
                    case 3:
                        className = '驳回';
                        break
                    case 4:
                        className = '废弃';
                        break            
                    default:
                        break;
                }

                return className;
            }
        },
        methods: {
            async getData() {
                this.$pixLoading.show('加载中…');
                try {
                    let res = await this.$model.getDetail({
                        fdFlowId: this.$route.query.fdFlowId
                    });
                    this.$pixLoading.close();
                    if(res.code ===1) {
                        this.pageData= res.data;
                        this.id = Aes.encrypt(this.pageData.fdFlowId)
                        this.id = this.pageData.fdFlowId;
                        return
                    }
                    this.$pixToast.show(res.msg)
                } catch (error) {
                    this.$pixLoading.close();
                    this.$pixToast.show(error.message);
                }
               

                
                this.$pixLoading.close();
            },
            openAudit() {
                let params = {
                    docUrl: `http://iflow.midea.com?mobile_templateId=${config.mobile_templateId}&formInstanceId=${this.pageData.fdFlowId}`,
                    fdKey: this.pageData.fdKey,
                    fdFlowId: this.pageData.fdFlowId
                };
                console.log(params);
                
                platform.showWidget(['com.midea.NewToDo', JSON.stringify(params)])
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style lang="less" scoped>
    .page-detail{
            background: #f3f2f1;
    }
    .detail-card {
        margin: 15rpx;
        // border: @border-color-light solid 1px;
        border-radius: 10rpx;
        background-color: @color-white;
        

        > .detail-theme {
            font-size: @fs-large;
            line-height: @fs-medium+20rpx;
            padding:0px 15rpx;
        }

        > .detail-content {
            padding: 0 15rpx;
            > .detail-bar {
                display: flex;
                font-size: @fs-base;
                 margin-bottom: 4rpx;
                .detail-bar-left {
                    width: 70rpx;
                    color: @color-text-secondary;
                    line-height: 22rpx;
                }

                .detail-bar-right {
                    line-height: 22rpx;
                    flex: 1;
                }
            }
        }

        > .detail-bottom-bar {
            height: 36rpx;
            display: flex;
            font-size: @fs-base;
            justify-content: space-around;
            line-height: 36rpx;
            padding: 0 15rpx;
            
            margin-top: 15rpx;
            position: relative;
            &::after {
                content: ' ';
                border-top: @border-color-light solid 1px;
                transform: scaleY(0.5);
                position: absolute;
                left: 0px;
                right: 0px;
                top: 0px;
            }
            
            > .detail-bottom-bar-left {
                flex: 1;
                color: @color-text-secondary;
                 .auditing {
                    color: #3DA5FE;
                }
                .pass {
                    
                    color: #6CC60A;
                }
                .reject {
                
                    color: #FE3824;
                }
                .abandon{
                   
                    color: gray;
                }
            }

            > .detail-bottom-bar-right {               
                flex: 1;
                text-align: right;
                .btn-check{
                    background-color: @color-primary;
                    width: 80rpx;
                    height: 30rpx;
                    color: @color-white;
                    text-align: center;
                    border-radius: 4rpx;
                    float: right;
                    line-height: 30rpx;
                    font-size: @fs-base;
                    margin-top: 3rpx;
                }
            }

        }

    }

    .flex-box{
        text-align: center;
    }
    .qr {
        width: 60%;
        margin: auto;
    }

    
</style>