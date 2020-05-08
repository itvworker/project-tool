<template lang="html">
    <el-container>
            <el-header class="list-header" style="height: 100px;">
                <el-row class="list-page-path">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>学校管理</el-breadcrumb-item>
                    <el-breadcrumb-item>班级管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
                <el-row :gutter="10">
                    <el-col  :xs="8" :sm="7" :md="6" :lg="5" :xl="5"><el-input type="text" placeholder="学校名称"  v-model="key"  size="small" /></el-col>
                    <el-col  :xs="8" :sm="7" :md="6" :lg="5" :xl="5">
                        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
                        <el-button size="small" icon="el-icon-refresh-left">重置</el-button>
                    </el-col>
                    <el-col :xs="6" :sm="10" :md="12" :lg="14" :xl="14" class="left-group">
                       
                        <el-button class="btn btn-upload" size="small"  >导入学校<input  @click="clear" type="file" @change="upload" refs="upload"  accept=".xlsx"  /></el-button>
                         <el-button class="btn"  size="small" >新增学校</el-button>
                    </el-col>
                </el-row>


            </el-header>

                <el-table
                v-loading="listLoading" 
                element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.6)"
                :data="list"
                stripe
                style="width: 100%">
                <el-table-column
                        label="序号"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.$index}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="school_name"
                label="所属学校"
                width="200">
                </el-table-column>
                <el-table-column width="200"
                prop="gradeTypeName"
                label="年级类型">
                </el-table-column>
                <el-table-column 
                prop="grade_name"
                label="班级">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="edit(scope.$index, list)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pages.current"
                :page-sizes="pages.pageSizes"
                :page-size="pages.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pages.total"/>
                <el-dialog :title="form.id?'编辑年级':'添加年级'" :modal="true"
                   :visible.sync="showStatus.edit" width="400px" :close-on-click-modal="false">
                    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="所属学校" prop="school_id">
                            <el-select size="small"
                                    v-model="form.school_id"
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择学校">
                                <el-option
                                        v-for="item in schools"
                                        :key="item.value"
                                        :label="item.school_name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="年级类型" prop="grade_type">
                            <el-select size="small"
                                    v-model="form.grade_type"
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择年级类型" >
                                <el-option
                                        v-for="item in gradeType"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>


                         <el-form-item label="年级类型" prop="grade_number">
                            <el-select size="small"
                                    v-model="form.grade_number"
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择年级">
                                    
                                <el-option
                                        v-for="item in grades"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>


                        <el-form-item class="btn-bar">
                            <el-button class="btn-submit" :loading="loading" type="primary" @click="submit">提交
                            </el-button>
                            <el-button class="btn-cancel" @click="showStatus.edit=false">取消</el-button>
                        </el-form-item>

            </el-form>
        </el-dialog>
    
    </el-container>
</template>
<script>
import address  from '@/libs/address.json';
import page from '@/mixins/page';
import data from './data'
import base from '@/mixins/page.base'
export default {
    mixins:[page,base],
    data() {
        return {
            map: '',
            key:'',
           
            showStatus: {
                dialog: false, //显示dialog
                uploading: false,
                uploadBtnText: '导入数据',
                //---------新增学校
                school: false,
                edit: false,
                mapCenter: ''
            },
            rules:data.rlueGrade,
            grades: [], 
            loading: false,
            gradeType: data.gradeType,
            form: {
                grade_type:'',
                school_id: '',
                grade_number:'',
                grade_name:''
                
            }
        }
    },
  
    methods: {
        upload(e) {
            
        },
        updateData() {

        },
        changeGrade(value) {
            if(typeof value === 'number' ) {
                this.grades = data.grades[parseInt(value)]
            }else{
                this.grades = [];
            }
            this.form.grade_number = ''
        },
        //打开编辑框
        edit(e, arr) {
            let item = arr[e];
            this.form = JSON.parse(JSON.stringify(item));
            this.grades = data.grades[parseInt(item.grade_type)]
            this.showStatus.edit = true;
        },
        async getList() {
            try {
                    this.listLoading = true;
                    let page = this.$route.query.page || 1;
                    let res = await this.$model.school.listGrade({
                        pageSize: this.pages.pageSize,
                        page: page,
                        keyword: this.$route.query.keyword || ''
                    })
                    
                    this.pages.total = res.count;
                    
                    let arr = []

                    if(res.datas) {
                        for(let i = 0, l = res.datas.length; i < l; i++) {
                            res.datas[i]['gradeTypeName'] =data.gradeType[res.datas[i].grade_type].name ;
                            arr.push(res.datas[i])
                        }
                    }
                    this.list = arr;
                    this.listLoading= false

                    

                } catch (error) {
                    
                    this.listLoading= false
                }
    
        },
        clear(e) {
            e.target.value = ''
        },
        submit() {
            this.$refs.form.validate(async (valid) => {
                if(!valid) return;
                this.form.grade_name = this.grades[this.form.grade_number].name;
                try {

                   if(this.form.id) {
                       let res = await this.$model.school.updataGrade(this.form) 
                        if(res===1) {
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                        }    
                        this.showStatus.edit = false;
                        this.updateData();
                   }else{
                       let res =  await this.$model.school.addGrade(this.form)
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
        this.getSchool()
        this.getList();
    },
    
}
</script>

<style lang="less" scoped>
    @import './less/index.less';

</style>
