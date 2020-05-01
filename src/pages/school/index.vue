<template lang="html">
    <el-container>
        <el-header class="list-header">
            <el-row :gutter="10">
                <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="5">
                    <el-input type="text" placeholder="学校名称" v-model="key" size="small"/>
                </el-col>
                <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="5">
                    <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
                    <el-button size="small" icon="el-icon-refresh-left">重置</el-button>
                </el-col>
                <el-col :xs="6" :sm="10" :md="12" :lg="14" :xl="14" class="left-group">

                    <el-button class="btn btn-upload" size="small" @click="showStatus.dialog=true">导入学校</el-button>
                    <el-button class="btn" size="small" @click="showStatus.school=true">新增学校</el-button>
                </el-col>
            </el-row>


        </el-header>

        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>

        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"/> -->
        <el-dialog title="导入学校" :visible.sync="showStatus.dialog" width="600px" :close-on-click-modal="false">


            <el-row>
                <div class="subtitle" title="">为提高导入的成功率，请下载使用系统提供模板 <a href="">点击此处下载模版</a></div>
            </el-row>
            <el-row class="title-col">
                    <span class="word-tips">
                        仅支持xlsx, xls, csv,文件大小≤4M
                    </span>
                <el-button class="upload-btn" size="medium" icon="el-icon-upload" :loading="showStatus.uploading"
                           type="primary">
                    {{showStatus.uploadBtnText}}
                    <input type="file" accept=".xlsx, .xls, .csv" @change="upload" @click="clear"></input>
                </el-button>
            </el-row>
        </el-dialog>

        <el-dialog title="添加学校" :visible.sync="showStatus.school" width="900px" :close-on-click-modal="false">
          <vuemap @add="openAddBox"/>
        </el-dialog>

        <el-dialog title="添加学校" :modal="false" :visible.sync="showStatus.edit" width="400px" :close-on-click-modal="false">
                <el-form>
                    <el-form-item label="学校名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
        </el-dialog>

    </el-container>
</template>
<script>
    import address from '@/libs/area.json';
    import {formatDate} from "../../libs/tool";
    import vuemap from '@/components/map/index'
    export default {
        components:{
            vuemap
        },
        data() {
            return {
                key: '',
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                showStatus: {
                    dialog: false, //显示dialog
                    uploading: false,
                    uploadBtnText: '导入数据',
                    //---------新增学校
                    school: true,
                    edit: false
                }
            }
        },
        methods: {
            openAddBox() {
                this.showStatus.edit = true;
            },
            calc(obj, pid, arr ) {
                if(!arr) {
                    arr = []
                }
                for(let i in obj) {
                    let p = pid===false? 0: pid;
                    arr.push({
                        pid:p,
                        name: obj[i].name,
                        id: obj[i].id
                    })
                    if(obj[i].children) {
                        this.calc(obj[i].children, obj[i].id, arr)
                    }
                }
                return arr;
            },
            async upload(e) {
                let param = new FormData();
                param.append('file', e.target.files[0]);
                this.showStatus.uploadBtnText = '上传中…';
                this.showStatus.uploading = true;
                try{
                    this.$model.school.list(param);

                }catch (err){

                }finally {
                    this.showStatus.uploadBtnText = '导入数据';
                    this.showStatus.uploading = false;
                    console.log(2);
                 }


            },
            clear(e) {
                e.target.value = ''

            }

        },
        mounted() {

        },

    }
</script>

<style lang="less" scoped>

    .btn-upload {
        position: relative;
        overflow: hidden;

        input {
            opacity: 0;
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            top: 0px;
            width: 100%;
        }
    }

    .left-group {
        .btn {
            float: right;
            margin-left: 10rpx;
        }
    }

    .list-header {
        padding-top: 15rpx;
    }

    .title-col {
        margin-top: 10rpx;
        margin-bottom: 10px;
    }

    .upload-btn {
        position: relative;
        overflow: hidden;
        input {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            left: 0px;
            top: 0px;
        }
    }
</style>
