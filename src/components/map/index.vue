<template lang="html">
    <div class="map-box">
        <div class="search-bar">

            <el-select @change="setProvince" v-model="selectArea.province" style="width:120px" size="small" placeholder="请选择省">
                <el-option
                        v-for="(item, index) in area.province"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                >
                </el-option>

            </el-select>
            <el-select v-model="selectArea.city" style="width:120px" size="small" placeholder="请选择市区">
                <el-option
                        v-for="item in area.city"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"

                >
                </el-option>
            </el-select>
            <el-input v-model="serachKey" placeholder="请输入地址关健字" type="text"style="width: 200px;" size="small" ></el-input>
            <el-button size="small" type="primary" @click="search">搜索</el-button>
        </div>

        <div class="main" ref="main">
        </div>
        <div class="subtitle">
           地点名称：{{message.name}} 地址: {{message.address}} 经纬度: {{message.lat}}, {{message.lng}}
        </div>
        <div class="group-btn">
            <el-button size="small" @click="add" icon="el-icon-plus" type="primary">添加学校</el-button>
        </div>
    </div>
</template>
<script>
import area from '@/libs/area.json';
import {getJsonStore, setStore } from "@/libs/tool";

export default {
    name: 'vue-map',
    data() {
        return {
            map: '',
            serachKey: '',
            selectArea:{
                province: '',
                city: '',
                area: ''
            },
            area:{
                province: [],
                city: [],
                area: []
            },
            marker: '',
            address: '',
            markers: [],
            message: {
                lat: '',
                lng: '',
                address: '',
                name: ''
            }
        }
    },
    created() {

    },
    methods: {
        send() {


        },
        add() {
            this.$emit('add', this.message)
        },
        async search() {
            let key = this.serachKey.replace(/\s+/g,"");
            if(key) {
                let res =await this.$model.map.searhAddress({
                    boundary: `region(${this.findId(this.selectArea.city).name},0)`,
                    keyword: key,
                    filter:'category=教育',
                    page_size: 20
                })

                if(res.status === 0 && res.data.length>0) {
                    this.markers.forEach((item)=>{
                        debugger
                        item.marker.setMap(null);
                    })

                    this.markers = res.data.map((item, index)=>{

                        item.marker = new qq.maps.Marker({
                            position: new qq.maps.LatLng(item.location.lat,item.location.lng),
                            map: this.map
                        });
                        qq.maps.event.addListener(item.marker, 'click', (e)=>{
                            this.clickMarker(e, item)
                        })
                        if(index === 0) {
                            this.map.panTo(new qq.maps.LatLng(item.location.lat, item.location.lng));
                        }
                        return item
                    })

                }


            }
        },
        setProvince(id) {
            this.area.city =  this.findArea(id);
            this.selectArea.city = ''
        },
        initArea(cache) {
            this.area.province = this.findArea(0);
            let nowArea = this.findId(cache.ad_info.adcode);
            this.area.area = this.findArea(nowArea.pid);
            this.selectArea.area = nowArea.id;
            let nowCity = this.findId(nowArea.pid);
            this.area.city = this.findArea(nowCity.pid);
            this.selectArea.city = nowCity.id;
            let nowProvince = this.findId(nowCity.pid);
            this.selectArea.province = nowProvince.id
        },
        findId(id) {
            for(let i =0, l = area.length; i < l; i++) {
                if(area[i].id == id) {
                    return area[i];
                }
            }
        },
        findPid(id) {
            for(let i =0, l = area.length; i < l; i++) {
                if(area[i].pid == id) {
                    return rea[i];
                }
            }
        },
        findArea(pid) {
            let arr = [];
            for(let i =0, l = area.length; i < l; i++) {
                if(area[i].pid == pid) {
                    arr.push(area[i])
                }
            }
            return arr;
        },
        // 获取申请流程列表
        async init(lat, lng) {
            let cache = getJsonStore('map-school-147');
            if(!cache) {
                let res = await this.$model.map.getIpGps();
                cache = res.result;
                let cache = setStore('map-school-147', cache);
            }
            this.initArea(cache);

            this.map = new qq.maps.Map(this.$refs.main,{
                center: new qq.maps.LatLng(cache.location.lat, cache.location.lng),
                zoom: 15
            });

            this.message.address = cache.address?cache.address:`${cache.ad_info.province}${cache.ad_info.city}${cache.ad_info.district}`;
            this.message.lat = cache.location.lat;
            this.message.lng = cache.location.lng;
            this.message.name = cache.title;
            //添加监听事件 
            qq.maps.event.addListener(this.map, 'click', this.clickMap);
            //添加点击标记
            // qq.maps.event.addListener(marker, 'click', this.clickMarker);
            qq.maps.event.addListener(this.map,'mousemove',this.moveMap);
            qq.maps.event.addListener(this.map, 'center_changed', this.centerMove);
        },

        //点击地图触发的方法
        async clickMap(e) {
            if(this.marker) {
                this.marker.setMap(null)
            }

            let res = await this.$model.map.getAdress({
                location:`${e.latLng.lat},${e.latLng.lng}`
            })
            this.marker = new qq.maps.Marker({
                position: e.latLng,
                map: this.map
            });

            let obj = {
                address: res.result.address,
                title: res.result.address_reference.landmark_l2.title,
                location: res.result.location
            }
            this.message.address = obj.address;
            this.message.lat = obj.location.lat;
            this.message.lng = obj.location.lng;
            this.message.name = obj.title;

            qq.maps.event.addListener(this.marker, 'click', (e)=>{
                this.clickMarker(e, obj)
            });
            // alert('您点击了地图.');
        },
        clickMarker(e, item) {
            this.message.address = item.address;
            this.message.lat = item.location.lat;
            this.message.lng = item.location.lng;
            this.message.name = item.title;


            // alert('您点击了标记.');
        },
        moveMap(e) {
            var latLng = e.latLng,
            lat = latLng.getLat().toFixed(5),
            lng = latLng.getLng().toFixed(5);

        },
        centerMove(e) {

            
        }
        
        
    },
    async mounted() {
        // let cid = returnCitySN.cid;
        // let city = this.findId(cid);
        // let province = this.findId(city.pid);
        // this.setProvince(province.id);
        // this.selectArea.province = province.id
        // this.selectArea.city = city.id;
        this.init()

    },
    
}
</script>

<style lang="less" scoped>

.main{
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 400px;
}
.subtitle{
    padding: 10px;
}
    .search-bar{
        margin-bottom: 10px;
    }
</style>
