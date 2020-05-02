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
        <div class="list">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column
                        label="序号"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.$index}}
                    </template>
                </el-table-column>

                <el-table-column  prop="name" label="学校名称" width="180" />
                <el-table-column prop="address" label="地址"  />
                <el-table-column prop="number" label="学生数量" width="100" />

                <el-table-column prop="cards"  label="打卡数" width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="edit(scope.$index, tableData)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pages.current"
                :page-sizes="pages.pageSizes"
                :page-size="pages.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pages.total"/>

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
            <el-form :model="schoolForm" :rules="rules" ref="school" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学校名称" prop="name">
                    <el-input v-model="schoolForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="address">
                    <el-input v-model="schoolForm.address"></el-input>
                </el-form-item>

                <el-form-item label="经纬度" prop="address">
                    <el-input v-model="schoolForm.latlng"></el-input>
                </el-form-item>
                <el-form-item class="btn-bar">
                    <el-button class="btn-submit" :loading="loading" type="primary" @click="submitAddSchool">提交</el-button>
                    <el-button class="btn-cancel"  @click="">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </el-container>
</template>
<script>
    import address from '@/libs/area.json';
    import {formatDate} from "../../libs/tool";
    import vuemap from '@/components/map/index'
    import data from './data'
    import page from '@/mixins/page'
    export default {
        mixins:[page],
        components:{
            vuemap
        },
        data() {
            return {
                key: '',
                tableData: data.list,
                showStatus: {
                    dialog: false, //显示dialog
                    uploading: false,
                    uploadBtnText: '导入数据',
                    //---------新增学校
                    school: false,
                    edit: false
                },
                schoolForm:data.list,
                loading: false,
                rules: data.rules,
                pages:{
                    current: 1
                }
            }
        },
        methods: {
            getList() {

            },
            edit(e, arr) {
                let item = arr[0];
                this.schoolForm = {
                    name: item.name,
                    address: item.address,
                    lat: item.lat || '',
                    lng: item.lng || '',
                    latlng: item.lat+','+item.lng
                }
            },
            openAddBox(e) {
                this.schoolForm = {
                    name: e.name||'',
                    address: e.address||'',
                    lat: e.lat || '',
                    lng: e.lng || '',
                    latlng: e.lat+','+e.lng
                },
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
                    this.$message({
                        message: '添加失败',
                        type: 'warning'
                    });

                }finally {
                    this.showStatus.uploadBtnText = '导入数据';
                    this.showStatus.uploading = false;
                    console.log(2);
                }


            },
            clear(e) {
                e.target.value = ''

            },
            async submitAddSchool() {
                this.$refs.school.validate((valid) => {

                    try{
                        this.loading = true;
                        let res = awaitthis.$model.school.add(param);
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }catch (err){
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    }finally {
                        this.showStatus.school = false;
                    }

                });
            }

        },
        mounted() {

        },

    }
</script>

<style lang="less" scoped>
    @import 'less/index.less';

</style>
