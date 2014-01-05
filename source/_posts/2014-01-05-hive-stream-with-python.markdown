---
layout: post
title: "用python写hive的UDAF"
date: 2014-01-05 15:33
comments: true
categories: 
- Hive
- Python
keywords: 
description: 
---
之前写过一篇关于说Python无法实现hive UDAF的文章，后来经过尝试，python完全可以代替JAVA实现hive中常用的UDF,UDAF,及UDTF.

通过`transform`语句，可以将hive语句中`select`得到的数据通过类似hadoop中<a href="http://hadoop.apache.org/docs/stable1/streaming.html">streaming</a>的方式，传给`using`语句中的脚本作为输入。用`DISTRIBUTE BY`将mapper的输出分类给reducer. 

##UDAF

由于`SELECT`和`DISTRIBUTE BY`是有先后顺序，所以要先得到经过`DISTRIBUTE BY`的数据，再用`TRANSFORM`进行转化，保证相同的key落入到同一个reducer中去。reducer把处理后的结果以`AS`中的字段格式进行输出。

```
FROM (
SELECT a,b,c,d
FROM db
DISTRIBUTE BY a
SORT BY a,b ) T
SELECT TRANSFORM(T.a, T.b, T.c, T.d)
USING 'python udaf.py'
AS (a,b,e)
``` 

``` python
#! /usr/bin/env python
#encoding=utf-8
import sys
import logging

current={"a":None,"b":None,"e":None}
a=None

def foo (c,d):
    e = ''
    #To-do, write something
    return e

def output ():
    #To-do, write something
    print ...
    
for l in sys.stdin:
    try:
        a,b,c,d = l.strip().split('\t')
        e=foo(c,d)
    except:
        logging.error(l)
        continue
    
    if current["a"] != a:
        if current["a"]: 
            output()
        current["a"]=a
        current["b"]=b
        current["e"]=e
    else:
        current["e"]+=e
        
if current["a"]:
    output()
```

##代码的重用

如果按照以上的方式，是可以实现UDAF的效果，但是代码的重用性不高。如果在java中，可以写多个不同功能的类，然后打在一个jar包中。不过在python中实现起来有点困难，比如我在另一个py脚本中定义两个函数foo,bar,在一个udaf脚本中需要先import那个py 模块，然后再用这两个函数。这样就需要在`add file`中同时添加两个py脚本，在实际使用过程中，发现添加多个py脚本后，在py代码中使用import语句，会找不到那个文件的路径。原因是在hdfs中，这些py脚本不一定会在同一个目录下。所以只能把所有需要用到的函数写在同一个py脚本中。这样一来，以后需要同种功能的函数时，需要重写这些代码。之后再看看有没有其他可行的方案。

<a href="{{root_url}}/blog/2013/09/25/hive-python-udf/">HIVE中使用python实现UDF</a>

<a href="{{root_url}}/blog/2013/11/01/udf-in-python-sucks/">在hive中使用python来做UDF有点糟</a>