<template>
    <div class="itv-scroller-content">
        <div class="itv-scroler-box">
            <div class="itv-scroller-refresh">
            下拉刷新
            </div>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
       
    },
    mounted() {
        
    },
    data() {
        return  {
            y:0,
            x:0,
            maxScrollY: 0,
            maxScrollX: 0
        }

    },
    methods: {

    }
}
</script>