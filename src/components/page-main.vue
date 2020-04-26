<template>
    <div class="page-main">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "page-main"
    }
</script>

<style lang="less" scoped>
    .page-main{
        flex: 1;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
</style>