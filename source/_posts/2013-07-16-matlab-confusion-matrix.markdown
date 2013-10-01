---
layout: post
title: 用matlab畫Confusion matrix
categories:
- Coding
- Tech
tags:
- matlab
status: publish
type: post
comments: true
published: true
meta:
  dsq_thread_id: '1781962138'
  _edit_last: '1'
---
在pattern recognition 中通常用confusion matrix 來表示實驗結果。最近處理論文的實驗結果時發現用matlab可以比較方便的畫出confusion matrix來。

以下是效果图。

<img class="aligncenter" alt="" src="http://farm8.staticflickr.com/7364/9303955419_9aafcbf1c2_o.png" width="584" height="477" />

```matlab
n = 14;
file = 'data.csv';
ylabels = ['BT';'CC';'CS';'DW';'OC';'  ';'RC';'RW';'SS';'TC';'TP';'WL';'WC';'WW'];
xlabels = ['BT';'CC';'CS';'DW';'OC';'  ';'RC';'RW';'SS';'TC';'TP';'WL';'WC';'WW'];

X = csvread(file);

%normalize
for i=1:n
    X(i,:)=X(i,:)/norm(X(i,:),1);
end
%inverse data
X=imcomplement(X);
%draw
imagesc(X);
colormap(gray);
axis off;
text(0,6,'Random','HorizontalAlignment','right');
for i=1:n
    text(0,i,ylabels(i,:),'HorizontalAlignment','right');
end
h=text(6,n+1,'Netural','VerticalAlignment','middle','HorizontalAlignment','right');
set(h,'rotation',60);
for i=1:n
    h = text(i,n+1,xlabels(i,:),'VerticalAlignment','middle','HorizontalAlignment','right');
    set(h,'rotation',60);
end
disp(X);
%add value
for i=1:n
    for j=1:n
        if X(i,j)<0.7
            text(i,j,num2str(1-X(i,j),'%.2f'),'VerticalAlignment','middle','HorizontalAlignment','center','color','white');
        end
    end
end
```