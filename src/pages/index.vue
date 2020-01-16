<template lang="html">
    <section>
        Home
        <!-- {{$t('pageName')}} -->
    </section>
</template>

<script>
export default {
    mounted() {
        console.log(this.$t());
    }
}
</script>

<style lang="less" scoped>

</style>
