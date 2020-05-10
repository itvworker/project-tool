<template lang="html">
    <el-container>
            欢迎登录萍安云平台

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
            ],
            showStatus: {
                dialog: false
            }
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
