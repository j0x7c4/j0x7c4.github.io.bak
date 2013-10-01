---
layout: post
title: HIVE中使用python实现UDF
categories:
- Coding
- Tech
tags:
- HIVE
- Python
status: publish
type: post
published: true
comments: true
meta:
  dsq_thread_id: '1795161006'
  _edit_last: '1'
---
HIVE，FACEBOOK的一个开源项目，利用类SQL的语句（HiveQL）来加快一般的MapReduce的开发过程。

UDF，user defined function, 因为HIVE毕竟不是一般的关系型数据库，支持的HQL有限，如果要实现复杂的功能，就要通过自己定义函数来帮助实现。

HIVE应该利用PIPE的原理，将自己查询的结果放到python脚本的stdin中。所以他的查询结果不会显示在terminal中，terminal中显示的结果是python的执行结果。

使用HIVE的命令进入数据仓库(search)
```
use search;
```
使用HIVE的命令查看已经建立的表
```
show tables;
```
使用HIVE的命令查看xxx表中的字段
```
describe xxx;
```
使用HIVE命令用PYTHON实现UDF
```
add file udf.py;
SELECT 
TRANSFORM(keyword)
USING 'python udf.py'
AS(keyword)
FROM xxx
WHERE dt='2013-09-25'
;
```
要注意的是，这里的TRANSFORM的内容可以写\*，但是AS()里就不能写\*，会报错。

输入到python中的内容，是按照AS里的数量来决定的。

下面是python的脚本，内容很简单，就是把输入的东西原封不动输出来。
``` python udf.py
import sys
for line in sys.stdin:
	line = line.strip()
	print line
```