<template>
    <page-container>
        <page-header title="物资出厂" @tapLeft="exitApp"></page-header>
        <page-main class="page-door">
            <div class="btn" @click="scanDoOut(1)">
                <img src="~@/assets/images/scanning.png">
                出厂
            </div>

            <div class="btn" @click="scanDoOut(2)">
                <img src="~@/assets/images/scanning.png">
                入厂
            </div>
            <div class="tip-box">
            <div class="tips-title"><label><img src="~@/assets/images/information.png" /></label>出厂放行说明</div>
            <div class="tip-content">
                <div><span></span>有外出需要需要申请出厂放行</div>
                <div><span></span>申请需要由直系主管审核</div>
                <div><span></span>审核通过会自动生成二维码</div>
                <div><span></span>警卫扫二维码通过即会放行</div>
                <div><span></span>返厂时扫二维码即解除出厂状态</div>
            </div>
        </div>     
        </page-main>

        <!-- <div class="page-confirm-bg" v-show="confirmShow" @click.stop="confirmShow=false">
            <div class="page-confirm" @click.stop="">
                <div class="title">
                    注意
                </div>
                <div class="text" v-if="status===4">本用户出厂未扫码</div>
                <div v-else class="text" >
                    本用户入厂未扫码
                </div>
                <div class="btn-confirm" @click="confirmShow=false">操作失误，重新扫码</div>
                <div class="sure-time" v-if="factoryStatus===5" @click="setUnnormal">确认入厂，记录时间</div>
                <div class="btn-unnormal" @click="setUnnormal">确认出厂，记录时间</div>
                
            </div>
        </div> -->
    </page-container>
</template>

<script>
    import {formatDate} from '@/libs/tool';
    import base from '@/mixins/page.base'
    import platform from '@/libs/platform'
    import { mapState } from 'vuex';
    export default {
        mixins:[ base ],
        data() {
            return {
                factoryStatus: '',//1为扫出厂码，2为扫出厂码,
                status: '', //异常状态,
                confirmShow: false,
                id: '', //申请单id
                pageData: {}
            }
        },
        computed: {
            ...mapState(['extra'])
        },
        mounted() { 
            setTimeout(()=>{    
                console.log(this.extra);
            }) 

            
            // this.restartScan(1,'45549395192692821')  
            
        },
        methods: {
            toPages (extra) {
                try {
                    if (extra.showWidgetKey) {
                        if (typeof extra.showWidgetKey === 'string') {
                            extra = JSON.parse(extra.showWidgetKey)
                        } else {
                            extra = extra.showWidgetKey
                        }
                        if (extra.docUrl) {
                            extra = common.GetRequest(extra.docUrl)
                        }
                    }
                } catch (e) {

                }
                
                
                
            },
            restartScan(type,id) {
                this.id = id;
                this.factoryStatus = type;
                this.getData(id);
            },
            
            async getData(id) {
                this.$pixLoading.show('提交中…');
                try {
                    let res = await this.$model.getDetail({
                    fdFlowId: id
                });
                this.$pixLoading.close();
                if(res.code===1) {
                    this.pageData = res.data;
                    //如果没出过厂， 然后扫的是出厂
                    if(this.factoryStatus===1 && this.pageData.finishStatus===0) {
                        this.$router.push({
                            name:'success',
                            query:{
                                fdFlowId: this.id,
                                type: 1
                            }
                        }) 
                        return
                    }

                    if(this.factoryStatus===1 && this.pageData.finishStatus===1) {
                        this.$pixConfirm.show('此单据已做出厂，请勿重复扫码', {
                            title: '警告',    
                            showCancel: true,
                            okText:'我知道了',
                            showCancel:false,
                           
                        })
                         return
                    }


                    if(this.factoryStatus===2 && this.pageData.finishStatus===1) {
                        this.$router.push({
                            name:'success',
                            query:{
                                fdFlowId: this.id,
                                type: 2
                            }
                        })    
                         return
                    }
                    //如果没出过厂， 然后扫的是出厂
                    if(this.factoryStatus===2 && this.pageData.finishStatus===0) {
                        this.$pixConfirm.show('此单据已做未出厂，请先出厂', {
                            title: '警告',    
                            showCancel: true,
                            okText:'我知道了',
                            showCancel:false,
                           
                        })
                        
                        return
                    }

                    //如果没出过厂， 然后扫的是出厂
                    if(this.pageData.finishStatus===2) {
                        this.$pixConfirm.show('此单据已做入厂，请勿重复扫码', {
                            title: '提示',    
                            showCancel: false,
                            okText:'我知道了'
                        })
                        return
                    }

                }
                
                this.$pixConfirm.show('未查到些单据信息，请确认二维码是否错误', {
                    title: '提示',    
                    showCancel: false,
                    okText:'我知道了'
                })   





                } catch (error) {
                    
                }

                 
            },
        
            /**
             * 扫码
             * @param value {Number} 1为出厂，2为入厂 
             */
            scanDoOut(value) {
                this.factoryStatus = value;
                platform.scan().then((data) => {
                    this.id = data.text;
                    this.restartScan(value, data.text);                  
                }).catch((e)=>{
                    console.log(e);
                });
            }
           
        }
    };
</script>
<style scoped>
    @import './doorkeeper.less';
</style>