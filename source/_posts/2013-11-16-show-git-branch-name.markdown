---
layout: post
title: "在Terminal中显示git的当前branch"
date: 2013-11-16 01:05
comments: true
categories: 
- Tech
tags:
- git
- mac
keywords: git, mac, branch 
description: 
---
不知道有没有人和我有同样的困扰，在使用git的时候不小心改到了master分支上的代码，然后还不小心push了，结果还成功push了，而且自己还没发觉是push到了master上。如果代码正确还好，一旦代码有些问题就会引来很大麻烦。

{%img images/blog/show-git-branch-name.png %}

mac的terminal上并没有自带功能显示当前的分支，所以需要自己手动修改bash的显示方式。如图上所示，新建一个`qrl`的目录，初始化`git`，当`commit`之后会产生`.git`的目录，从`.git`中获取当前的分支名字。

实现起来比较容易，在.bash_profile中加入下面的代码就可以了。
``` bash
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ [\1]/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```

对于PS1的参数可以参考下面的来写
>\d ：代表日期

>\H ：完整的主机名称

>\h ：仅取主机的第一个名字

>\t ：显示时间为24小时格式，如：HH：MM：SS

>\T ：显示时间为12小时格式

>\A ：显示时间为24小时格式：HH：MM

>\u ：当前用户的账号名称

>\v ：BASH的版本信息

>\w ：完整的工作目录名称。家目录会以 ~代替

>\W ：利用basename取得工作目录名称，所以只会列出最后一个目录

>\\# ：下达的第几个命令

>\$ ：提示字符，如果是root时，提示符为：# ，普通用户则为：$


###参考
<http://martinfitzpatrick.name/article/add-git-branch-name-to-terminal-prompt-mac>
<http://blog.sina.com.cn/s/blog_610913ea0100fce1.html>