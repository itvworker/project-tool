<template lang="html">
    <page-container>
        <page-header title="物资出厂" ></page-header>
        <page-main ref="main">
            <div class="box-search">
                <input type="text" />
            </div>
        </page-main>
    </page-container>
</template>
<script>

export default {
    data() {
        return {
            map: ''
        }
    },
    methods: {
        // 获取申请流程列表
        init() {
            this.map = new qq.maps.Map(this.$refs.main.$el,{
                center: new qq.maps.LatLng(39.916527,116.397128),
                zoom: 13
            });
                
            //添加监听事件 
            qq.maps.event.addListener(this.map, 'click', this.clickMap);
            //添加点击标记
            // qq.maps.event.addListener(marker, 'click', this.clickMarker);
            qq.maps.event.addListener(this.map,'mousemove',this.moveMap);
            qq.maps.event.addListener(this.map, 'center_changed', this.centerMove);
        },

        //点击地图触发的方法
        clickMap(e) {
            let marker = new qq.maps.Marker({
                position:e.latLng, 
                map: this.map
            });
            qq.maps.event.addListener(marker, 'click', this.clickMarker);
            // alert('您点击了地图.');
        },
        clickMarker(e) {
            console.log(e);
            // alert('您点击了标记.');
        },
        moveMap(e) {
            var latLng = e.latLng,
            lat = latLng.getLat().toFixed(5),
            lng = latLng.getLng().toFixed(5);
            console.log(lat+','+lng);
        },
        centerMove(e) {
            console.log(e);
            
        }
        
        
    },
    mounted() {
        this.init();
    },
    
}
</script>

<style lang="less" scoped>



</style>
