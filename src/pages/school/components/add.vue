<template>

</template>

<script>
    export default {
        name: "add",
        props: {
            form: {
                type: Object,
                default: ()=> {}
            }
        },
        data() {
            return {
                form: {

                }
            }
        },
        methods:{
            init(value) {
                this.form = value;
            }
        }

    }
</script>

<style scoped>

</style>