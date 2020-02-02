<template lang="html">
    <div class="itv-ui">
        <div class="itv-bg">

        </div>
        <transition :name="currentTransition">
            <div class="itv-toast">
                <i></i>
            </div>
        </transition>

    </div>
</template>

<script>
export default {
    props: {
        transition: String,
    },
    computed: {
        currentTransition() {
            if(this.transition) {
                return this.transition
            }
            if (this.position === 'top') {
              return 'itv-slide-from-top'
            }
            if (this.position === 'bottom') {
              return 'itv-slide-from-bottom'
            }
            return 'itv-fade'
        }
    }
}
</script>

<style lang="less" scoped>

</style>
