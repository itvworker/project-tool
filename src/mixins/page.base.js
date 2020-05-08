export default {
    data() {
        return {
            schools: [],
            submitting: false
        }
    },
    methods: {
        async getSchool() {
            let res = await this.$model.school.list({
                pageSize: 100000000,
                page: 1
            })
            this.schools = res.datas 

        },
        goBack(value = -1) {
            this.$router.go(value)
        },
        exitApp() {
            platform.exit()
        }
    },
    mounted() {
        this.getSchool();
    }
}