import platform from '@/libs/platform'
export default {
    methods: {
        goBack(value = -1) {
            this.$router.go(value)
        },
        exitApp() {
            platform.exit()
        }
    }
}