---
layout: post
title: "Sublime Text 备忘"
date: 2013-11-13 11:33
comments: true
categories:
- Tech 
keywords: sublime text 2, 备忘, package 
description: 
---
Sublime Text 是个很不错的文本编辑工具，已经使用1年多了。这里整理一些关于Sublime的使用方法，防止以后忘记。

##在线安装Package
###安装Package Control
+ 用 Ctrl+\` 打开Console
+ 在console中加入下面这段脚本

``` python
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```

+ 重新打开sublime

###用Package Control安装插件
+ `Command+Shift+p`打开命令面板(如果非mac就用`Ctrl`代替`Command`)
+ 输入`install`打开Install Package
+ 选择需要的插件安装

###添加Repository
想要使用更多的插件，可以自行添加网上的repository，比如github.

+ `Command+Shift+p`打开命令面板
+ 选择`package Control:Add Repository`
+ 然后在底下的Repository URL中填入github地址，比如<https://github.com/freewizard/SublimeFormatSQL>
+ 最后再选择`install package`来安装插件

###常用插件
+ SublimeFormatSQL <https://github.com/freewizard/SublimeFormatSQL>

###备注
+ SublimeFormatSQL的最新版对Sublime Text 2的兼容性有点问题，我用朋友给的旧版本就可以了。具体issue参见<https://github.com/freewizard/SublimeFormatSQL/issues/14>
