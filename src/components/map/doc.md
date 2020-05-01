

```javascript
 var marker = new qq.maps.Marker({
        position: center,
        map: map
    });
    //添加到提示窗
var info = new qq.maps.InfoWindow({
    map: map
});
//获取标记的点击事件
    qq.maps.event.addListener(marker, 'click', function() {
        info.open(); 
        info.setContent('<div style="text-align:center;white-space:nowrap;'+
        'margin:10px;">单击标记</div>');
        info.setPosition(center); 
    });



 //绑定单击事件  传递事件函数名称
    var listener = qq.maps.event.addListener(map, 'click', function(event) {
        alert('您点击的位置为: [' + event.latLng.getLat() + ', ' +
        event.latLng.getLng() + ']');
    });
    //移除绑定事件
    window.removeEvent = function() {
        qq.maps.event.removeListener(listener);
    };
    

```

### DOM事件监听
```javascript
var container=document.getElementById("container");
    var map = new qq.maps.Map(container,{
        center: new qq.maps.LatLng(39.916527,116.397128),
        zoom: 13
    });
    qq.maps.event.addDomListener(container,'click',function(event){
        alert(this.tagName);
    });
```

### 监听移动事件
```javascript
    qq.maps.event.addListener(map,'mousemove',function(event) {
            var latLng = event.latLng,
                lat = latLng.getLat().toFixed(5),
                lng = latLng.getLng().toFixed(5);
            document.getElementById("latLng").innerHTML = lat+','+lng;
        });
```