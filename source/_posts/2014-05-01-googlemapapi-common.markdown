---
layout: post
title: "Google Map API之获取地址和经纬度"
date: 2014-05-01 00:48
comments: true
categories: 
- google map
- tech
- coding

---
`Google Map`提供的API很强大，可以通过输入简单的地址，得到和该地址相关的详细信息。

* 通过地址去查经纬度信息

个人觉得很有用的信息，就是这个`GEOCODING`API能够返回`formatted_address`和经纬度。

以下是相应的API，通过传递address参数（可以是简单的路名，甚至不用指定国家），就能获得相关地址的详细信息。

```
https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false&key=API_KEY
```

<br/>

* 通过经纬度去查地址信息

这个`REVERSE GEOCODING`API可以通过传递特定的经纬度，获得该经纬度的详细地址信息。包括门牌号，路名，地区名，国家等非常详尽的信息。

```
https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true_or_false&key=API_KEY
```

<br/>

另外，Google Map还提供`Direction API`, `Distance Matrix API`, `Elevation API`和`Time Zone API`

<https://developers.google.com/maps/documentation/webservices/>