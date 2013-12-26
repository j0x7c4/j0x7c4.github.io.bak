---
layout: post
title: Python urllib+json 与web API交互
categories:
- Coding
- Tech
tags:
- Python
- WEB
status: publish
comments: true
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '1795176585'
---
目前的web app都流行用URL的方式传递Query, 然后接受server回传过来的json格式的结果。

利用python的urllib和json这两个模块，很容易就可以抓取里面的信息。

``` python
import json
import urllib
url=URL_QUERY
f = urllib.urlopen(url)
j = json.loads(f.read())
```

f这个object存储了server回传的信息，通过`read()`将文字信息读出来。

`loads()`将文字信息转成dictionary和list的形式，存储在j中。
