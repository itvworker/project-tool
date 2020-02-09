<template lang="html">
    <itv-dialog v-model="value" :hideOnClick="hideOnClick">
        <div class="itv-popup">
            <div class="itv-popup-content">
                <slot>
                    <h2>提示</h2>
                    <div class="itv-popup-msg">
                        什么鬼
                    </div>
                </slot>
            </div>
            <div class="itv-group-btn">
                <div @click="cancel" v-show="!hideBtnCancel" class="itv-popup-cancel">
                    取消
                </div>
                <div @click="confirm" class="itv-popup-confirm">
                    确认
                </div>
            </div>
        </div>
    </itv-dialog>
</template>

<script>
import ItvDialog from '../dialog/dialog.vue'
export default{
    name:'itv-popup',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        hideOnClick: {
            type: Boolean,
            default: false
        },
        hideBtnCancel: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ItvDialog
    },
    watch: {
        value(a, b) {
            if(!a) {
                this.$emit('close')
            }
        }
    },
    methods: {
        cancel() {
            this.$emit('hide');
            this.$emit('cancel');
        },
        confirm() {
            this.$emit('hide');
            this.$emit('confirm');
        }
    }


}
</script>

<style lang="less" scoped>
@import '../../assets/css/animate.less';

.itv-popup {
    background-color: #fff;
    border-radius: 4ipx;
    width: 260ipx;

}
.itv-group-btn {
    display: flex;
    height: 44ipx;
    position: relative;
    >div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        font-size: 16ipx;
        &:active {
            background-color: rgba(0,0,0,0.1);
        }
    }
    &:after {
        border-bottom: #ddd solid 1px;
        position: absolute;
        left: 0px;
        right: 0px;
        content: '';
        transform: scaleY(0.5);
    }
    .itv-popup-confirm {
        color: @primary-color;
    }
    .itv-popup-cancel{
        color: #aaa;
        position: relative;
        &::after{
            position: absolute;
            content: ' ';
            border-right: #ddd solid 1px;
            transform: scaleX(0.5);
            right: 0px;
            top: 0px;
            bottom: 0px;
        }
    }
}
.itv-popup-content {
    padding: 10ipx;
    h2 {
        font-weight: normal;
        text-align: center;
        padding:  10ipx 0px;
        margin: 0px;
        font-weight: 400;
    }
    .itv-popup-msg {
        text-align: center;
        font-size: 14ipx;
        padding-bottom: 10ipx;
        color: #999;
    }

}
</style>
