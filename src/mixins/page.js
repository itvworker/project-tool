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
            list: []
        }
    },
    methods: {
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
        }

    }
}
