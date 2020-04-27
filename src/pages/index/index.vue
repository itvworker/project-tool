<template lang="html">
    <page-container>
        <page-header title="物资出厂" ></page-header>
        <page-main ref="main">
            <div class="box-search">
                <select>
                    <option disabled value="" selected>请选择省份</option>
                    <option v-for="(item, index) in province" :value="id">{{item.name}}</option>
                </select>
                <select>
                    <option disabled value="" selected>请选择市区</option>
                    <option v-for="(item, index) in province" :value="id">{{item.name}}</option>
                </select>
                <select>
                    <option disabled value="" selected>请选择市区</option>
                    <option v-for="(item, index) in province" :value="id">{{item.name}}</option>
                </select>

            </div>

        </page-main>
    </page-container>
</template>
<script>
import address  from '@/libs/address.json';
export default {
    data() {
        return {
            map: '',
            marker: '',
            province: address,
            selected:[
                province: '',
                city: '',
                area: ''
            ]
        }
    },
    methods: {
        initArea() {
            // console.log()
            // for(let i = 0 , l = address.length; i < l; i++) {
            //     if(address[i].TopID === 0) {
            //         this.province.push(address[i])
            //     }
            // }
        },
        // 获取申请流程列表
        init() {
            this.map = new qq.maps.Map(this.$refs.main.$el,{
                center: new qq.maps.LatLng(39.916527,116.397128),
                zoom: 13
            });
            let citylocation = new qq.maps.CityService({
                complete : (result)=>{
                    this.map.setCenter(result.detail.latLng);
                }
            });
            //调用searchLocalCity();方法    根据用户IP查询城市信息。
            citylocation.searchLocalCity();
            //添加监听事件 
            qq.maps.event.addListener(this.map, 'click', this.clickMap);
            //添加点击标记
            // qq.maps.event.addListener(marker, 'click', this.clickMarker);
            qq.maps.event.addListener(this.map,'mousemove',this.moveMap);
            qq.maps.event.addListener(this.map, 'center_changed', this.centerMove);
        },

        //点击地图触发的方法
        clickMap(e) {
            if (this.marker) {
                this.marker.setMap(null);
                this.marker = '';
            }
            this.marker = new qq.maps.Marker({
                position:e.latLng, 
                map: this.map
            });
            qq.maps.event.addListener(this.marker, 'click', this.clickMarker);
            // alert('您点击了地图.');
        },
        clickMarker(e) {

            // alert('您点击了标记.');
        },
        moveMap(e) {
            var latLng = e.latLng,
            lat = latLng.getLat().toFixed(5),
            lng = latLng.getLng().toFixed(5);
            // console.log(lat+','+lng);
        },
        centerMove(e) {
            console.log(e);
            
        }
        
        
    },
    mounted() {
        this.init();
        this.initArea()
    },
    
}
</script>

<style lang="less" scoped>
.box-search{
    position: absolute;
    z-index: 100;
    bottom: 0px;
}


</style>
