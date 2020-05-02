<template lang="html">
    <el-container>

        <el-header class="list-header" style="height:100px">
            <el-row class="list-page-path">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>学校管理</el-breadcrumb-item>
                    <el-breadcrumb-item>学校列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
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
                    <el-button class="btn" size="small" @click="openAddSchool">新增学校</el-button>
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

                <el-table-column prop="school_name" label="学校名称" width="180"/>
                <el-table-column prop="chool_address" label="地址"/>
                <el-table-column prop="number" label="学生数量" width="100"/>
                <el-table-column prop="cards" label="打卡数" width="120">
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
                    <input type="file" accept=".xlsx, .xls, .csv" @change="readXlsx" @click="clear"></input>
                </el-button>
            </el-row>
        </el-dialog>

        <el-dialog :title="showStatus.typeMap==='add'?'添加学校':'选择位置'" :visible.sync="showStatus.school" width="900px"
                   :close-on-click-modal="false">

            <vuemap @add="openAddBox" ref="map" @latlng="editLatLng" :center="showStatus.mapCenter" :type="showStatus.typeMap"/>

        </el-dialog>

        <el-dialog :title="schoolForm.id?'编辑学校':'添加学校'" :modal="schoolForm.id?true:false"
                   :visible.sync="showStatus.edit" width="400px" :close-on-click-modal="false">
            <el-form :model="schoolForm" :rules="rules" ref="school" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学校名称" prop="school_name">
                    <el-input v-model="schoolForm.school_name"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="school_address">
                    <el-input v-model="schoolForm.school_address"></el-input>
                </el-form-item>

                <el-form-item label="经纬度" prop="gps_latitude_longitude">
                    <el-input v-model="schoolForm.gps_latitude_longitude">
                        <div slot="suffix" class="btn-open-map el-icon-location-outline" @click="openLatLng"></div>
                    </el-input>
                </el-form-item>
                <el-form-item class="btn-bar">
                    <el-button class="btn-submit" :loading="loading" type="primary" @click="submitAddSchool">提交
                    </el-button>
                    <el-button class="btn-cancel" @click="showStatus.edit=false">取消</el-button>
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
    import manageXlxs from './xlsx'

    export default {
        mixins: [page],
        components: {
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
                    edit: false,
                    typeMap: 'add', //地图类型 add latlng
                    mapCenter: ''
                },
                schoolForm: {},
                loading: false,
                rules: data.rules,
                pages: {
                    current: 1
                }


            }
        },
        methods: {
            getList() {

            },
            editLatLng(obj) {
                this.schoolForm.gps_latitude_longitude = obj.lat+','+obj.lng;
                this.showStatus.school = false;

            },
            openAddSchool() {
                this.showStatus.school = true;
                this.showStatus.mapType = 'add';

            },
            openLatLng() {
                this.showStatus.school = true;
                this.showStatus.typeMap = 'latlng';
                this.showStatus.mapCenter = this.schoolForm.gps_latitude_longitude;
                this.$nextTick(()=>{
                    if(this.$refs.map){
                        this.$refs.map.moveLatLng(this.showStatus.mapCenter)
                    }

                })

            },
            manageMessage(res) {
                let school = manageXlxs.school(res.Sheets['学校']);
                let teacher = manageXlxs.teacher(res.Sheets['老师']);
                let guard = manageXlxs.guard(res.Sheets['老师']);
            },
            //打开编辑框
            edit(e, arr) {
                let item = arr[e];
                this.schoolForm = JSON.parse(JSON.stringify(item))
                this.showStatus.edit = true;
            },
            openAddBox(e) {
                this.schoolForm = {
                    school_name: e.name || '',
                    school_address: e.address || '',
                    gps_latitude_longitude: e.lat + ',' + e.lng
                };
                this.showStatus.edit = true;

            },
            async upload(e) {
                let param = new FormData();
                param.append('file', e.target.files[0]);
                this.showStatus.uploadBtnText = '上传中…';
                this.showStatus.uploading = true;
                try {
                    this.$model.school.list(param);
                } catch (err) {
                    this.$message({
                        message: '添加失败',
                        type: 'warning'
                    });

                } finally {
                    this.showStatus.uploadBtnText = '导入数据';
                    this.showStatus.uploading = false;
                    console.log(2);
                }


            },

            async submitAddSchool() {
                this.$refs.school.validate((valid) => {
                    try {
                        this.loading = true;

                        let res = awaitthis.$model.school.add(param);
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    } catch (err) {
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                    } finally {
                        this.showStatus.school = false;
                        this.loading = false;
                    }

                });
            }

        },
        mounted() {

        },

    }
</script>

<style lang="less" scoped>
    @import './less/index.less';

</style>
