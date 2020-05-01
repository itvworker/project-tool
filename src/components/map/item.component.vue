<template>
    <div class="wm-content-box" @click.stop="$emit('click')" >
        <div class="wm-name-area">{{item.docSubject||item.fdDocreator}}</div>
        <div class="vm-time-area" v-if="item.fdOutDate">
            出厂时间：
            <span class="vm-time-date">{{item.fdOutDate.split(' ')[0]}} </span>
        </div>
        <div class="wm-check-btn" :class="statusType">{{statusWord}}</div>
        <div class="vm-time-area" v-if="item.fdReturnDate">
            归还日期：
            <span class="vm-time-date">{{item.fdReturnDate.split(' ')[0]}}</span>

        </div>
    </div>
</template>

<script>
    export default {
        name: "item",
        props: {
            item: {
                type: Object,
                default: ()=>{
                    return{
                        status:1
                    }
                }
            }
        },
        computed:{
            statusType() {
                const styles = ['auditing','pass', 'reject', 'abandon'];
                return styles[parseInt(this.item.fdStatus)-1];
            },
            statusWord() {
                const words = ['审核中','已通过','驳回','废弃'];
                return words[parseInt(this.item.fdStatus)-1];
            }
        },
        data() {
            return {

            }
        },

    }
</script>

<style lang="less" scoped>
    .wm-content-box {
        position: relative;
        
        width: 100%;
        padding: 15rpx;
        background: @color-white;
        box-sizing: border-box;
        &::after{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: @border-color-base solid 1px;
            transform: scaleY(0.5);
        }
        .wm-name-area {
            margin-bottom: 10rpx;
            font-size: @fs-medium;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .vm-time-area {

            font-size: @fs-base;
            color: @color-text-regular;
            line-height: 24rpx;
        }
        .wm-check-btn {
            position: absolute;
            height: 26rpx;
            line-height: 26rpx;
            width: 60rpx;
            /*top: 50%;*/
            /*transform: translateY(-50%);*/
            right: 15rpx;
            bottom: 15rpx;
            // background: rgba(61,165,254,0.16);
            border-radius: 4rpx;
            font-size: @fs-small;
            // color: #3DA5FE;
            text-align: center;
        }
        .auditing {
            background: rgba(61,165,254,0.16);
            color: #3DA5FE;
        }
        .pass {
            background: rgba(108,198,10,0.16);
            color: #6CC60A;
        }
        .reject {
            background: rgba(254,56,36,0.16);
            color: #FE3824;
        }
        .abandon{
            background: rgba(112,128,144,0.16);
            color: gray;
        }
    }

</style>