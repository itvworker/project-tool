<template lang="html">
    <section>
        Home
        {{$t('name', {msg:'你妹'})}}
    </section>
</template>

<script>
export default {
    mounted() {
        console.log(this.$t('lang.pageName'));
    }
}
</script>

<style lang="less" scoped>

</style>
