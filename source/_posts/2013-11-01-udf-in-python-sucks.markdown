---
layout: post
title: "在hive中使用python来做UDF有点糟"
date: 2013-11-01 23:57
comments: true
tags:
- python
- hive
categories: 
- Tech
keywords: hive,python,udf
description: 
---
之前写了篇介绍如何在HIVE中用python来写UDF的文字，最近终于也开始需要用UDF来处理一些数据了。

可是现实和理想总是存在些差距，原本想着python简洁的代码和随改随用的特性，在UDF的灵活性上显得有点苍白无力。利用`TRANSFORM`, `USING`, `AS`的结构来把python的脚本当做UDF，虽然看起来非常方便，但实际用起来却有很大问题。

##无法单独处理某个字段
没有仔细研究过这个具体的流程，不过猜想应该是从hive中select出来的数据以pipe的形式转到python的stdin中，再把python中的stdout的内容转到hive的输出中。这样如果仅需对选出的某个字段进行处理，其余字段不进行处理的话，必须在Python脚本中注意当前要处理的字段是第几个，一旦select中的顺序有所改变，那python脚本应该就无法处理了。目前仅选一个字段出来进行处理的情况比较少，大部分都是选出好几个字段来看。所以虽然python很好，不过我还是“十动然拒”了吧。

##无法外加聚集函数
在使用中，下面这种格式是很死的。

``` sql
SELECT TRANSFORM(field_A, field_B) USING 'python foo.py' AS(field_AA, field_BB) FROM ...
```

比如你想再对UDF外面加一层`Count`是没有办法实现的。某人会告诉你格式不对，无法运行。但是常规的用java写的UDF是没有问题的，全部都能hold住~

##外加的吐槽
实际工作中，不仅仅需要`UDF`，`UDAF`和`UDTF`都是会经常遇到的。而Python拼死只能处理UDF的情况，对于后者只能呵呵了。于是反正UDAF和UDTF还是需要JAVA来写，那UDF也就顺便用JAVA写了吧。这样代码也统一一点，便于管理。

所以虽然python在UDF上的效果可以实现，不过功能太过简单，实际环境下还是很无力的。接下来还是用JAVA写`UDF`,`UDAF`和`UDTF`吧。回头吧，少年~