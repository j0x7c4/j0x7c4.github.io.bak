---
layout: post
title: 用matlab畫3D線段
categories:
- Matlab
- Tech
tags:
- matlab
status: publish
type: post
comments: true
published: true
meta:
  dsq_thread_id: '1445082917'
  _edit_last: '1'
---
``` matlab
figure %create the figure
t = 0:1:135  %create the vector
h1 = plot3(t,t,135-t)  %draw x-y-z+135 = 0
hold on
grid on
h2 = plot3(t,t,zeros(length(t))) %draw x-y = 0
set(h1,'color',[0,0,0])  %set color black
set(h2,'color',[0,0,0])
```
