---
layout: post
title: "在octopuses中加入Google map"
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

keywords: 
description: 
---

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

把`gmap.js`放在`source/javascripts`中，并且在`source/_includes/head.html`中加入下面几行：

``` html
<script async="true" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="{{ root_url }}/javascripts/gmap.js"></script>
```

如果已经在前面加过jQuery的话，就不用加第一行了。
然后在文章中，加入下面这段html代码，其中lat和lng表示地点的经纬度，这个是目前是需要自己输入的。

``` html
<div id="map-canvas" lat="41.850033" lng="-87.6500523"></div>
```

我以为这样子应该能显示地图了，可是实际上却无法显示。这个问题我折腾了很久，最后才发现需要给div加css. 所以要在`source/stylesheets`中创建一个css样式文件（被HTML坑了）。

``` css gmap.css
#map-canvas { margin: 20px 0 20px 0; height: 300px;}
```

所以在`source/_includes/head.html`中也要加入下面这行：

``` html
<link href="{{ root_url }}/stylesheets/gmap.css" rel="stylesheet" type="text/css">
```

这样子应该可以出现下面的结果了：

<div id="map-canvas" lat="41.850033" lng="-87.6500523"></div>

目前存在的问题是，因为都使用id叫map-canvas的div, 所以在同个页面中显示多个地图就会出错了。之后再想办法改进。又快天亮了，先睡了zzz