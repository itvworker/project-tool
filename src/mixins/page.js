import xlsx from 'xlsx';
export default {
    data() {
        return {
            pages: {
                current:1,
                total: 400,
                pageSizes:[10, 20, 50, 100],
                pageSize:10
            },
            list: [],
            key: '',
            listLoading: false,
            condition: {
                beginDate:'',
                endDate: '',
                dete:'',
                keyword:'',
                school_id: ''
            },
            schoolType:[
                {
                    name: '小学',
                    value: 1  
                },
                {
                    name: '初中/高中',
                    value: 2   
                },
                {
                    name: '大学',
                    value: 3
                }     
            ],
            pickerOptions: {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }]
              }

        }
    },
    
    methods: {
        initDate(){
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            this.condition.date=[start, end]
        },
        handleSizeChange(total) {
                
        },
        handleCurrentChange(page) {
            let name = this.$route.name;
            let query = JSON.parse(JSON.stringify(this.$route.query));
            query.page = page;
            this.$router.replace({
                name: name,
                query: query
            })
            this.pages.current = page;
            this.getList();
        },
        clear(e) {
            e.target.value = ''
        },
        readXlsx(e) {
            const file = e.target.files[0];
            // eslint-disable-next-line no-undef
            let reader = new FileReader();
            reader.onload = (e) => {
                let workbook = xlsx.read(e.target.result, {type: 'binary'})

                console.log(workbook)
                this.manageMessage(workbook);
            };
            reader.readAsBinaryString(file);
        },
        search() {
            
            this.$router.replace({
                name: this.$route.name,
                query: {
                    keyword: this.key,
                    page: 1
                }
            }) 
            this.getList();   
        },
        restart() {
            if(this.$route.query.keyword) {
                this.key = '';
                this.$router.replace({
                    name: this.$route.name,
                    query: {
                        keyword: this.key,
                        page: 1
                    }
                }) 
                this.getList();
            }
        }
        

    },
    mounted() {
        this.key = this.$route.query.keyword || ''
        this.initDate();
    }
}
