<template lang="html">
       <router-view />
</template>

<script>
import $ from 'jquery'
export default {
    mounted() {
        $(document).on('click','.doc-tab-group>.tab-item-btn', function(e){
            e.stopPropagation();
            let index = $(this).index();
            $(this).parent().find('.tab-item-btn').removeClass('active')
            $(this).addClass('active')
            let html = $(this).parent().next().children()
            html.hide()
            html.eq(index).show()
            console.log(html);
        })
    }
}
</script>
<style lang="less">
body,html{
    padding: 0px;
    margin: 0px;
    height: 100%;
}
#app {
    background-color: @itv-page-white;
}
</style>
