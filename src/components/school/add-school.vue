<template>
    <el-dialog title="选择学校"  :visible.sync="visible" width="800px" >
        <div class="header-box">
            <el-input type="text" @keyup.enter="search" placeholder="请输入搜索学校名称" style="width:300px" v-model="key" size="small"/>
            <el-button type="primary" size="small" icon="el-icon-search" :loading="loading">搜索</el-button>
        </div>
        <div class="scroll-box" v-loading.lock="fullscreenLoading">
            <el-radio :label="item.id" v-for="item in list" v-model="selected">
                <div class="title">
                    {{item.school_name}}
                </div>
                <div class="address">
                    {{item.school_address}}
                </div>
            </el-radio>

        </div>
        <div class="bottom-bar">
            <el-button @click="" type="primary" @add="sure"   >确定</el-button>
        </div>


    </el-dialog>
</template>

<script>
    export default {
        name: "add-school",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                list:[
                    {
                        id:1,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:2,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:3,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:4,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:5,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:6,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:7,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:8,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },{
                        id:9,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    },
                    {
                        id:10,
                        school_name:'顺德小学',
                        school_address: '方式要城需要地地厅需要霜夺'
                    }
                ],
                selected:'',
                key: ''
            }
        },
        methods: {
            sure() {
                this.$emit('update:visible', false);
                this.$emit('sure', this.find(this.selected))
            },
            findId(id) {
                for(let i = 0, l = this.list.length; i < l; i++) {
                    if(item.id===id) {
                        return item;
                    }
                }
                return {}
            },
            search() {
                if(this.fullscreenLoading) {
                    return;
                }
                try {
                    this.loading = true;


                } catch (err) {
                    this.$message({
                        message: '添加失败',
                        type: 'warning'
                    });
                } finally {
                    this.showStatus.school = false;
                    this.loading = false;
                }
                this.list = [];
                this.$model.school.getList({
                    keywork: key.replace(/\s/ig, ''),
                    pageIndex: 1,
                    pageSize: 20,
                })
            }

        }

    }
</script>

<style lang="less" scoped>
    .scroll-box{
        height: 400px;
        overflow-y: auto;

        margin-top: 10px;
        /deep/ .el-radio {
            border-bottom:#ddd solid 1px;
            display: block;
            padding-top: 10px;
            height: 50px;
            .el-radio__input{
                display: block;
                width: 16px;
                float: left;
                padding-top: 10px;

            }
            .el-radio__label{
                float: left;
                .title{
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;

                }
                .address{
                    font-size: 14px;
                    margin-top: 6px;
                    color: #666;

                }
            }
            &.is-checked{
                font-size: 16px;
                font-weight: bold;
                .el-radio__label{
                    .title{
                        color: #409eff;

                    }
                }

            }

        }


    }

    .bottom-bar{
        padding-top: 15px;
    }

</style>