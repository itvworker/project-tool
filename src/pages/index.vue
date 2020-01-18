<template lang="html">
    <section>
        Home
        {{$t('name', {msg:'你妹'})}}

        <nut-picker
            :is-visible="isVisible1"
            :default-value-data="defaultValueData1"
            :list-data="listData1"
            @close="switchPicker('isVisible1')"
            @confirm="setYearValue"
        />


    </section>
</template>

<script>
import picker from '$p/components/picker/picker'
export default {
    components: {
       picker
    },

    mounted() {
        console.log(this.$t('pageName'));
    }
}
</script>

<style lang="less" scoped>

</style>
