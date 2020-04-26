<template>
    <section class="page-container">
        <slot></slot>
    </section>
</template>

<script>
    export default {
        name: "page-container"
    }
</script>

<style lang="less" scoped>
    .page-container{
        display: flex;
        height: 100%;
        flex-direction: column;
    }
</style>