<template lang="html">
    <page-container>
        <keep-alive>
            <router-view />
        </keep-alive>
    </page-container>
    
</template>

<script>
    import platform from '@/libs/platform'
    import config from '@/config'
    export default {
        data() {
            return {
                show: false
            }
        },
        methods:{
        },
        created() {
           
            
        },
        mounted() {
            
        }
    }
</script>

<style lang="less">
    body, html {
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>
