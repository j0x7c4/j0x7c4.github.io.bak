---
layout: post
title: "试用networkx"
date: 2013-10-16 01:44
comments: true
categories: 
- Tech
- coding
tags: python,networks
keywords: python, networkx, pagerank
  
description: 
---
最近想用pagerank的方法来分析微博好友之间的权威关系，于是试着用crawler去抓微博上好友的信息，然后建立关系网络。在网上看到用networkx可以比较方便的建立关系网络，并且可以比较方便的用pagerank计算每个好友的重要性。

使用networks加入node和edge都很方便，并且networkx宣称他的node可以支持任何python的hashable的类型，于是我一开始使用custom的node.

```python
class user:
	def __init__(self,args):
		assert re.search('^[\d]+$',args['uid'])
		self.uid = args['uid']
		self.info = args
	def __hash__(self):
		return int(self.uid)
```

可是这样写并不正确，他好像对自定义的类支持不太好（或许是不支持自定义类）。于是在网上查了好久，才看到要实现给一个node添加附加信息的方法。

<http://stackoverflow.com/questions/8490794/how-do-i-make-a-cutomised-object-as-a-node-for-networkx-and-how-do-i-look-it-up>

于是在加入node的时候，应该用
```python
G.add_node("label",foo="foo",bar="bar")
```

于是把添加node改写成

```python
G.add_node(user.uid,user.info)
```
添加node和edge是没问题了，结果在保存`gml`文件时又出问题了，里面的字符串竟然不支持utf-8… 官方是这么解释的：
>Notes

>GML specifications indicate that the file should only use 7bit ASCII text encoding.iso8859-1 (latin-1).

>This implementation does not support all Python data types as GML data. Nodes, node attributes, edge attributes, and graph attributes must be either dictionaries or single stings or numbers. If they are not an attempt is made to represent them as strings. For example, a list as edge data G[1][2][‘somedata’]=[1,2,3], will be 
represented in the GML file as:

><http://networkx.lanl.gov/reference/generated/networkx.readwrite.gml.write_gml.html>

于是我只好抽取是ascii的编码的用户信息。然后把类的定义改写成：

``` python
class user:
	def __init__(self,args):
		
		assert re.search('^[\d]+$',args['uid'])

		self.uid = args['uid']
		self.info = {'uid':args['uid'],\
					 'n_follows':args['n_follows'],\
					 'n_fans':args['n_fans'],\
					 'n_weibos':args['n_weibos']}

	def __hash__(self):
		return int(self.uid)
```

这样终于正常创建网络，读写gml文件了。
