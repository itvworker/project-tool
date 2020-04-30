<template lang="html">
    <el-container>
            <el-header class="list-header">
                <el-row :gutter="10">
                    <el-col  :xs="8" :sm="7" :md="6" :lg="5" :xl="2"><el-input type="text" placeholder="学校名称"  v-model="key"  size="small" /></el-col>
                    <el-col  :xs="8" :sm="7" :md="6" :lg="5" :xl="2">
                        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
                        <el-button size="small" icon="el-icon-refresh-left">重置</el-button>
                    </el-col>
                    <el-col :xs="6" :sm="10" :md="12" :lg="14" :xl="2" class="left-group">
                       
                        <el-button class="btn btn-upload" size="small"  >导入学校<input  @click="clear" type="file" @change="upload" refs="upload"  accept=".xlsx"  /></el-button>
                         <el-button class="btn"  size="small" >新增学校</el-button>
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
    
    </el-container>
</template>
<script>
import address  from '@/libs/address.json';
export default {
    data() {
        return {
            map: '',
            key:'',
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
            ]
        }
    },
    methods: {
        upload(e) {
            
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

.btn-upload{
    position: relative;
    overflow: hidden;
    input{
        opacity: 0;
        position:absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        width: 100%;
    }
}

.left-group{
    .btn{
        float: right;
        margin-left: 10rpx;
    }
}
.list-header{
    padding-top: 15rpx;
}
</style>
