---
layout: post
title: "在octopress中加入Google map"
date: 2013-10-07 02:21
comments: true
categories: 
- Tech
- Coding
tags:
- octopress
- google
- javascript
- jQuery

keywords: google map, jQuery, octopress, octolayer

description: 
---
###需要科学上网才能正常显示Google Map(API被墙了T_T)

想在octopress中插入地图信息，考虑到之后可能会在博客中加入关于游记的文章，如果文章能有形象的地图信息会有很好的效果。于是在网上搜寻octopress的地图插件，发现一个叫做<a herf="http://mguentner.github.io/octolayer/">Octolayer</a>的插件，想载下来试试，不过github刚好出问题，我无法获取代码，再加上他不是用google map. 作为一个google的忠实脑残粉，我就决定自己写一个。

研究了一下<a href="https://developers.google.com/maps/documentation/javascript/">google map API</a>，发现难度并不大。就是在我的文章内容中加入一个div，然后用js去render. 照着sample code改了一下代码，主要是为了从div的属性中读取经纬度坐标。（需要jQuery）

``` javascript gmap.js
function initialize() {
  var lat = $("#map-canvas").attr("lat"); 
  var lng = $("#map-canvas").attr("lng"); 
  console.log(lat);
  console.log(lng);
  var loc = new google.maps.LatLng(lat,lng);
  var mapOptions = {
    zoom: 7,
    center: loc,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
      position: loc,
      map: map,
      title: 'Hello World!'
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
```
<!--more-->

<b>但是上面的方法对于需要多个marker时会比较难处理，于是进行如下修改(10月7日下午修改)</b>

``` javascript gmap.js
function initialize() {
  
  if (!$("div#map-canvas")[0]) return; //check there is map-canves
  
  var locations=[];

  //get locations from div.map-marker
  $("div.map-marker").each(function(){
    console.log($(this).attr('name'));
    locations.push([$(this).attr('name'),$(this).attr('lat'),$(this).attr('lng')]);
  });
  
  
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 10,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  var infowindow = new google.maps.InfoWindow();

  for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

```

把`gmap.js`放在`source/javascripts`中，并且在`source/_includes/head.html`中加入下面几行：

``` html
<script async="true" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="{{ root_url }}/javascripts/gmap.js"></script>
```

如果已经在前面加过jQuery的话，就不用加第一行了。
然后在文章中，加入下面这段html代码。
其中div.map-marker用来传递每个marker的信息（lat和lng表示地点的经纬度，name表示marker的名字，这些是目前是需要自己输入的）; div#map-canvas用来最终显示地图。

``` html
<div class="map-marker" lat="-33.890542" lng="151.274856" name = "BondiBeach" ></div>
<div class="map-marker" name = "CoogeeBeach" lat= "-33.923036" lng="151.259052"></div>
<div id="map-canvas"></div>
```

我以为这样子应该能显示地图了，可是实际上却无法显示。这个问题我折腾了很久，最后才发现需要给div加css. 所以要在`source/stylesheets`中创建一个css样式文件（被HTML坑了）。

``` css gmap.css
#map-canvas { margin: 20px 0 20px 0; height: 300px;}
```

所以在`source/_includes/head.html`中也要加入下面这行：

``` html
<link href="/stylesheets/gmap.css" rel="stylesheet" type="text/css">
```

这样子应该可以出现下面的结果了：

<div class="map-marker" lat="-33.890542" lng="151.274856" name = "BondiBeach" ></div>
<div class="map-marker" name = "CoogeeBeach" lat= "-33.923036" lng="151.259052"></div>
<div id="map-canvas"></div>

目前存在的问题是，因为都使用id叫map-canvas的div, 所以在同个页面中显示多个地图就会出错了。之后再想办法改进。又快天亮了，先睡了zzz
