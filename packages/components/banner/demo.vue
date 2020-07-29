<template>
    <itv-container>
        <itv-header>Banner</itv-header>
        <itv-main>
            <banner>
                <banner-item>
                    <div class="demo-banner banner-1"></div>
                </banner-item>
                <banner-item>
                    <div class="demo-banner banner-2"></div>
                </banner-item>
            </banner>
        </itv-main>
    </itv-container>

</template>

<script>
import banner from './index.vue'
import bannerItem from '../banner-item/index.vue'
export default {
    components: {
        banner,
        bannerItem 
    },
    data() {
        return {};
    },
    methods: {
        open() {
            console.log('link----------');
        }
    },
    mounted() {

    }
};
</script>

<style lang="less" >
@import './banner.less';
@import '../banner-item/banner-item.less';

</style>
<style lang="less" scoped>
.banner-1{
    background-color: #eee;
    height: 300px;
}
.banner-2{
    background-color: red;
    height: 300px;
}
</style>
