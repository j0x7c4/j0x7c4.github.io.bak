---
layout: post
title: "从wordpress到octopress迁移成功"
date: 2013-10-01 23:49
comments: true
categories: 
- Tech
tags:
- ruby
- octopress

---
忙活了一晚上，终于把原来wordpress的数据导入到了octopress中，心情不好的时候做些geek的事情转移一下注意力也不错，现在有点小开心。

我是参照下面这个链接介绍的方法，把原来wordpress的数据导出成xml文件，然后再用jekyll-import来转的。不过貌似转完之后还需要自己手动修改一些地方，比如代码高亮部分。幸好我之前的内容也不多，就小改了一下。

<http://jekyllrb.com/docs/migrations/>

不过目前还有个问题，从wordpress转过来的文章，在超链接上还是有点问题，如果标题中有中文，转完后的文件名是unicode编码，之后会找不到超链接。于是我手动把那些文件名改成了英文，幸好文章不多，大概改了半小时改完了。

接下来要了解markdown语法啦，用这个写博客真的很酷！