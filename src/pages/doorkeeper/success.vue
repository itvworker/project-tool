<template>
    <page-container class="success-page">
        <page-header title="信息确认" @tapLeft="$router.go(-1)" ></page-header>
        <page-main class="page-main" ref="main">
            <div class="page-content">
                <div class="detail-bar">
                    <div class="detail-bar-left">申请人:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdDocreator}}-{{pageData.fdApplyDate}}
                    </div>
                </div>
                 <!-- <div class="detail-bar">
                    <div class="detail-bar-left">申请日期:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdApplyDate}}
                    </div>
                </div> -->

                <div class="detail-bar">
                    <div class="detail-bar-left">申请单号:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdNo}}
                    </div>
                </div>

                <div class="detail-bar">
                    <div class="detail-bar-left">申请部门:</div>
                    <div class="detail-bar-right">
                        {{pageData.fdDept}}
                    </div>
                </div>

               
                
                <div class="detail-bar" v-if="pageData.fdOutDate">
                    <div class="detail-bar-left">出厂日期:</div>
                    <div class="detail-bar-right">{{pageData.fdOutDate}}</div>
                </div>

                <!-- <div class="detail-bar" v-if="pageData.fdOutDate">
                    <div class="detail-bar-left">是否归还:</div>
                    <div class="detail-bar-right">{{pageData.fdIsReturn==="Y"?'是':'否'}}</div>
                </div> -->

                <div class="detail-bar" v-if="pageData.fdReturnDate">
                    <div class="detail-bar-left">归还日期:</div>
                    <div class="detail-bar-right">{{pageData.fdReturnDate}}</div>
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
                <div class="detail-bar" >
                    <div class="detail-bar-left">物资去向:</div>
                    <div class="detail-bar-right">{{pageData. fdDestination}}</div>
                </div>
               
                <div class="detail-bar" >
                    <div class="detail-bar-left">申请原因：</div>
                    <div class="detail-bar-right">{{pageData.fdReason}}</div>
                </div>

                <div class="detail-bar" >
                    <div class="detail-bar-left">总量：</div>
                    <div class="detail-bar-right">{{pageData.all}}</div>
                </div>

            </div>
            <div class="material-table-title">
                明细表
            </div>

            <div class="material-table">
                <div class="row title">
                    <div class="cell" style="width:25%">
                        物资类型
                    </div>
                    <div class="cell" style="width:30%">
                        物料描术
                    </div>
                    <div class="cell" style="width:30%">
                        物资编码/品牌规格
                    </div>
                    <div class="cell" style="10%">
                        数量
                    </div>
                    <div class="cell">
                        
                    </div>
                </div>
                <div class="row" v-for="(item, index) in list" @click="link(index)">
                    <div class="cell">
                        {{item.fdType}}
                    </div>
                    <div class="cell">
                        {{item.fdName}}
                    </div>
                     <div class="cell">
                        {{item.fdModel}}
                    </div>
                    <div class="cell">
                        {{item.fdCount}}
                    </div>
                    <div class="cell arrow-cell" >
                        <img :src="arrow" class="arrow" />
                    </div>
                </div>
            </div>
            
                <div class="btn" @click="submit">
                    确认{{this.type===1?'出厂':'入厂'}}
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
                pageData: {},
                list:[],
                top: 0,
                submiting: false
            }
        },
        beforeRouteEnter (to, from, next) {
          
            next(vm => {
                if(from.name === 'list') {
                    vm.cache();
                }else{
                    vm.getData();
                }
                
                // 通过 `vm` 访问组件实例
            })
        },
        beforeRouteLeave(to, from, next){
            this.top = this.$refs.main.$el.scrollTop;
            next();
        },
        computed: {
            arrow() {
                return `data:image/svg+xml,%3csvg t='1583894449808'
                 viewBox='0 0 1024 1024' version='1.1' xmlns='http:%2f%2fwww.w3.org%2f2000%2fsvg'
                  xmlns:xlink='http:%2f%2fwww.w3.org%2f1999%2fxlink' width='200' height='200'
                  %3e%3cdefs%3e%3cstyle type='text%2fcss'%3e%3c%2fstyle%3e%3c%2fdefs%3e%3cpath fill='rgb(153,153,153)'
                  d='M695.04 840.32 399.36 541.44l285.44-295.04c12.16-12.8 12.16-33.28 0-45.44-12.16-12.8-32-12.8-44.16 0l-309.76 320c-12.16 12.8-12.16 33.28 0 45.44C333.44 568.96 336 570.24 339.2 572.16l311.04 314.24c12.8 12.8 32.64 12.8 45.44 0C707.2 873.6 707.2 853.12 695.04 840.32z' %3e%3c%2fpath%3e%3c%2fsvg%3e`

            },
            type() {
                return parseInt(this.$route.query.type)
            }
        },
        methods: {
            
            cache() {
                this.$refs.main.$el.scrollTop = this.top
            },
            async getData() {
                try {
                    this.$pixLoading.show('加载中…');
                    let res = await this.$model.getDetail({
                        fdFlowId: this.$route.query.fdFlowId
                    });

                    if(res.code===1) {
                        this.pageData =  this.manageData(res.data);
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

                if(res.fdReturnDate) {
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
            },
            submit() {
                if(this.submiting) return
                this.submiting = true;   
                let type = parseInt(this.$route.query.type)
                if(type>=2) {
                    this.setOutMes("RETURN")
                    return
                }
                if(type ===1) {
                    this.setOutMes("CONFIRM")
                    return;
                }
            },
            /**
             * 出入厂状态
             */  
            async setOrderStatus() {
                try {
                    this.$pixLoading.show('提交中……')
                    let res = await this.$model.setOrderStatus({
                        fdFlowId: this.$route.query.fdFlowId,
                        operateStatus: parseInt(this.$route.query.type)
                    })
                    this.$pixLoading.close();
                    if(res.code===1) {

                        this.$pixConfirm.show('出厂成功', {
                            showCancel: true,
                            icon: 'pixicon pixradio_chosen',
                            okText:'返回首页',
                            showCancel:true,
                            cancelText: '退出应用'
                        }).then((res)=>{
                            if(res.isConfirm) {
                                this.$router.go(-1)
                                return
                            }
                            this.exitApp()
                            
                        });
                        return

                    }
                         this.$pixConfirm.show(res.msg, {
                            showCancel: true,
                            okText:'返回首页',
                            showCancel:true,
                            cancelText: '取消'
                        }).then((res)=>{
                            if(res.isConfirm) {
                                this.$router.go(-1)
                                return
                            }
                        });
                   
                } catch (error) {
                    this.$pixLoading.close();
                    this.$pixToast.show(error.message);
                }
            },
             /**
             * 记录异常
             */
            async setUnnormal() {
                try {
                    this.$pixLoading.show('提交中……')
                    let res = await this.$model.setUnnormal({
                        fdFlowId: this.$route.query.fdFlowId,
                        exceptionStatus: parseInt(this.$route.query.type)
                    })
                    this.$pixLoading.close();
                    this.$pixConfirm.show('入厂成功', {
                        showCancel: true,
                        icon: 'pixicon pixradio_chosen',
                        okText:'退出应用',
                        showCancel:true,
                        cancelText: '返回首页'
                    }).then((res)=>{
                        if(res.isConfirm) {
                            this.exitApp()
                            return
                        }
                        this.$router.go(-1)
                    });

                  

                } catch (error) {
                    
                    this.$pixLoading.close();
                    this.$pixToast.show(error.message);
                }
       
              
            },
          
            async setOutMes(value) {
                this.$pixLoading.show('提交中……')
                try {
                        let tokenReulst = await this.$model.getToken({    
                        "User":"MDT2MES",
                        "Pwd": "MDT2MES"
                    })   
                    let Authorization = '';
                    if(tokenReulst.code ===1 ) {
                        Authorization = tokenReulst.data.Data.TokenType+ ' ' +tokenReulst.data.Data.Token
                    }

                    let res = await this.$model.setOutMes({
                        "INV_ORG_ID": 116,
                        "BILL_NO": this.pageData.fdNo,
                        "OUTBOUND_GUARDER": this.pageData.fdDocreator,
                        "PLACE":"事业部",
                        "OPERATE_TYPE":value
                    },{
                        Authorization: Authorization
                    })
                    if(res.ErrorCode===0) {
                        if(this.type>2) {
                            this.setUnnormal();
                        }else{
                            this.setOrderStatus()
                        }
                    }else{
                        this.$pixToast.show(res.Message)
                        this.$pixLoading.close();
                        this.submiting = false;
                    }   
                } catch (error) {
                    this.$pixLoading.close();
                    this.$pixToast.show(error.message);
                    this.submiting = false;
                }
                
                       
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-content{
        padding:0rpx 15rpx;
        background-color: #fff;
    }
    .detail-bar {
        display: flex;
        font-size: @fs-base;
        padding: 5rpx 0rpx;
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

    .material-table{
        display: table;
        padding: 0px 15rpx;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        .row{
            display: table-row;
         
            box-sizing: border-box;
            position: relative;
            &.title {
                color: #666;
            }
           
            .cell {
                display: table-cell;
                text-align: left;
                height: auto;
                padding: 10rpx 5rpx;
                box-sizing: border-box;
                position: relative;
                /*display: table-cell时margin会失效*/
                 &::after{  
                     
                    content: ' ';
                    position: absolute;
                    border-bottom: #f1f1f1 solid 1px;
                    transform: scaleY(0.5);
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
                .arrow{
                    width: 15rpx;
                    transform: rotate(180deg) translate(-50%,-50%);
                    
                    position: absolute;
                    
                    top: 50%;
                    margin-left: 0rpx;
                    transform-origin: top;
                }
                &.arrow-cell{
                    width: 15rpx;
                    position: relative;

                }
            }
        }
    }
    .btn{
        height: 44rpx;
        margin: 15rpx 15rpx 0rpx 15rpx;
        text-align: center;
        background-color: @color-primary;
        line-height: 44rpx;
        font-size: 16rpx;
        color: #fff;
        border-radius: 22rpx;
    }
  
</style>
<style lang="less">
  .pix-app .pix-confirm .pix-confirm-wrap .pix-confirm-content .pix-confirm-container .pix-confirm-icon-wrap .pix-confirm-icon.pixradio_chosen{
        color: @color-success !important;
    }
</style>