---
layout: post
title: 用matlab画Sphere Coordinate System
categories:
- Coding
- Tech
tags:
- matlab
- plot
status: publish
type: post
comments: true
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '1776409848'
---
```matlab
Figure %create a figure
[x,y,z]=sphere(10) %get the mesh of x,y,z for 10x10 surface sphere
h=surf(x,y,z) %create the object of surface
axis equal 
set(h,'FaceColor',[0 0 0],'FaceAlpha',0.5) %change the surface color, and alpha
```
寫thesis需要各種圖，那些圖用photoshop畫會瘋掉。Matlab可以畫出科學上需要的圖。
