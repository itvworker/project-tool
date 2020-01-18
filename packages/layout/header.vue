<template lang="html">
        <div class="itv-header">
            <div class="itv-icon-arrow" @click="back"></div>
            头部
        </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
.itv-header {
    height: 44ipx;
    background-color: @itv-page-main;
    color: @itv-page-white;
    position: relative;
    text-align: center;
    font-size: 18ipx;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0px;
}
.itv-icon-arrow{
    position: absolute;
    height: 44ipx;
    left: 0px;
    line-height: 44ipx;
    padding-left: 10ipx;
    padding-right: 10ipx;
}
</style>
