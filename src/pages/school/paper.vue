<template lang="html">
    <el-container>
        <el-header class="list-header" style="height:100px">
            <el-row class="list-page-path">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>学校管理</el-breadcrumb-item>
                    <el-breadcrumb-item>学生管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
            <el-row :gutter="10">
                <el-col :xs="18" :sm="16" :md="18" :lg="18" :xl="20">
                    <el-select size="small"
                            v-model="selected.school_id"
                            filterable
                            allow-create
                            default-first-option
                            placeholder="选择学校" style="width:120px">
                        <el-option
                                :key="0"
                                label="全部"
                                :value="0">
                        </el-option>
                        <el-option
                                v-for="item in schools"
                                :key="item.id"
                                :label="item.school_name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select size="small"
                               v-model="selected.school"
                               filterable
                               allow-create
                               default-first-option
                               placeholder="性别" style="width:120px">
                        <el-option
                                :key="0"
                                label="不限"
                                :value="0">
                        </el-option>
                        <el-option
                                :key="1"
                                label="男"
                                :value="1">
                        </el-option>
                        <el-option
                                :key="2"
                                label="女"
                                :value="2">
                        </el-option>
                    </el-select>

                   
                    <el-input type="text" style="width: 200px" placeholder="学校名称" v-model="key" size="small"/>
                    <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
                    <el-button size="small" icon="el-icon-refresh-left">重置</el-button>
                </el-col>
                <el-col :xs="6" :sm="8" :md="6" :lg="6" :xl="4" class="left-group">
                    <el-button class="btn btn-upload" size="small" @click="showStatus.dialog=true">导入学生</el-button>
                    <el-button class="btn" size="small" @click="openAddBox">新增学生</el-button>
                </el-col>
            </el-row>
        </el-header>


        <div class="list">
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column
                        label="序号"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.$index}}
                    </template>
                </el-table-column>
                <el-table-column  prop="student_name" label="学生姓名" width="180" />
                <el-table-column  prop="student_code" label="学生学号" width="180" />
                <el-table-column  prop="student_card" label="学生身份证号" width="200" />
                <el-table-column  prop="school_name" label="学生性别" width="60" />
                <el-table-column prop="number" label="学生数量" width="100" />
                <el-table-column prop="cards"  label="打卡数" width="120" /
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




        <!--       导入   -->
        <el-dialog title="导入学生" :visible.sync="showStatus.dialog" width="600px" :close-on-click-modal="false">
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


        <el-dialog title="添加学生" :modal="false" :visible.sync="showStatus.edit" width="400px" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="school" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学生名称" prop="student_name">
                    <el-input v-model="form.student_name"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所属学校" prop="school_id">
                    <el-select  style="width: 100%"
                               v-model="selected.school_id"
                               filterable
                               allow-create
                               default-first-option
                               placeholder="请选择" >
                        <el-option
                                :key="0"
                                label="全部"
                                :value="0">
                        </el-option>
                        <el-option
                                v-for="item in schools"
                                :key="item.school_id"
                                :label="item.school_name"
                                :value="item.school_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="学生姓名" prop="student_name">
                    <el-input v-model="form.latlng"></el-input>
                </el-form-item>
                <el-form-item label="学生学号" prop="student_card">
                    <el-input v-model="form.latlng"></el-input>
                </el-form-item>
                <el-form-item label="学生性别" prop="student_sex">
                    <el-input v-model="form.student_sex"></el-input>
                </el-form-item>
                <el-form-item label="所属年级" prop="school_class_id">
                    <el-input v-model="form.school_class_id"></el-input>
                </el-form-item>
                <el-form-item class="btn-bar">
                    <el-button class="btn-submit" :loading="sumbitting" type="primary" @click="submit">提交</el-button>
                    <el-button class="btn-cancel"  @click="">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </el-container>
</template>
<script>
    import address from '@/libs/area.json';
    import {formatDate} from "../../libs/tool";
    import data from './data'
    import page from '@/mixins/page'
    import base from '@/mixins/page.base'
    export default {
        mixins:[page, base],
        components:{
        },
        data() {
            return {
                key: '',
                tableData: data.list,
                showStatus: {
                    addShcool: true,
                    student: false,
                    dialog: false, //显示dialog
                    uploading: false,
                    uploadBtnText: '导入数据',
                    //---------新增学校
                    school: false,
                    edit: false
                },
                form:{
                    school_id:'',
                    school_class_id: '',
                    student_code: '',
                    grade_number: '',
                    grade_name: '',
                    student_name: '',
                    student_sex: '',
                    student_card: ''  
                },
                loading: false,
                rules: data.student,
                gradeType: data.gradeType,
                sumbitting: false,
                pages:{
                    current: 1
                },
                selected: {
                    school: '',
                    school_id: '',
                    school_calss: ''
                }


            }
        },
        methods: {
            async getList() {
                try {
                    this.listLoading = true;
                    let page = this.$route.query.page || 1;
                    let res = await this.$model.school.listClock({
                        pageSize: this.pages.pageSize,
                        page: page,
                        keyword: this.$route.query.keyword || ''
                    })
                    
                    this.pages.total = res.count;
                    let arr = []
                    if(res.datas) {
                        for(let i = 0, l = res.datas.length; i < l; i++) {
                            arr.push(res.datas[i])
                        }
                    }
                    this.list = arr;
                    this.listLoading= false

                } catch (error) {
                    
                    this.listLoading= false
                }
            },
            
            selectSchool() {

            },
            edit(e, arr) {
                let item = arr[0];
                this.form = item;
                this.showStatus.edit = true;
            },
            openAddBox(e) {
                this.form = {
                    school_id:'',
                    school_class_id: '',
                    student_code: '',
                    grade_number: '',
                    grade_name: '',
                    student_name: '',
                    student_sex: '',
                    student_card: ''  
                }
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
            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if(!valid) return;
                    this.form.grade_name = this.grades[this.form.grade_number].name;
                    try {

                        if(this.form.id) {
                            let res = await this.$model.school.updataStudent(this.form) 
                                if(res===1) {
                                    this.$message({
                                        message: '更新成功',
                                        type: 'success'
                                    });
                                }    
                                this.showStatus.edit = false;
                                this.updateData();
                        }else{
                            let res =  await this.$model.school.updataGrade(this.form)
                            if(res===1) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.showStatus.edit = false;
                                this.updateData();
                            } 
                        } 
                
                        
                    } catch (error) {
                        if(this.schoolForm.id) {
                            this.$message({
                                message: '更新失败',
                                type: 'warning'
                            });
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                        }
                    }
                
                })
            }

        },
        mounted() {
            this.getList()
        },

    }
</script>

<style lang="less" scoped>
    @import 'less/index.less';

</style>
