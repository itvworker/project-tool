<template>
    <div class="page-header">
        <div class="left" @click="leftEvent">
            <img :src="arrow" />
        </div>
        <div class="center" >{{title}}</div>
        <div class="right" @click="rightEvent"></div>
    </div>
</template>

<script>
    export default {
        name: "page-header",
        props: {
            title: { //标题
                type: String,
                default:''
            }

        },
        computed: {
            arrow() {
                return `data:image/svg+xml,%3csvg t='1583894449808'
                 viewBox='0 0 1024 1024' version='1.1' xmlns='http:%2f%2fwww.w3.org%2f2000%2fsvg'
                  xmlns:xlink='http:%2f%2fwww.w3.org%2f1999%2fxlink' width='200' height='200'
                  %3e%3cdefs%3e%3cstyle type='text%2fcss'%3e%3c%2fstyle%3e%3c%2fdefs%3e%3cpath fill='rgb(153,153,153)'
                  d='M695.04 840.32 399.36 541.44l285.44-295.04c12.16-12.8 12.16-33.28 0-45.44-12.16-12.8-32-12.8-44.16 0l-309.76 320c-12.16 12.8-12.16 33.28 0 45.44C333.44 568.96 336 570.24 339.2 572.16l311.04 314.24c12.8 12.8 32.64 12.8 45.44 0C707.2 873.6 707.2 853.12 695.04 840.32z' %3e%3c%2fpath%3e%3c%2fsvg%3e`

            }
        },
        methods:{
            leftEvent() {
                this.$emit('tapLeft');
            },
            rightEvent() {
                this.$emit('tapRight');
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-header{
        height: @bar-base;
        position: relative;
        display: flex;
        background-color: @color-white;
        &::after {
            content: ' ';
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: @border-color-base solid 1px;
            position: absolute;
            transform: scaleY(0.5);
        }

        >.left{
            position: absolute;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 44rpx;
            height: 44rpx;
            >img{
                width: 22rpx;
                height: 22rpx;
            }
        }
        >.center {
            text-align: center;
            font-size: @fs-medium;
            height: @bar-base;
            justify-content: center;
            align-items: center;
            width: 100%;
            display:flex;

        }
    }
</style>