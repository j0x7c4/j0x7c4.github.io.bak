---
layout: post
title: "开发Chrome插件中遇到的一些坑"
date: 2013-12-23 00:03
comments: true
categories: 
- Tech 
- Chrome
- Google
keywords: 
description: 
---
前几天参加了一个hackthon, 在大约24小时的时间内，完成了一个chrome插件，插件扩展大众点评现有的一些功能，比如增加了街景视图，网页上的右键搜索菜单，和本地的点评商户收藏夹。具体可以自己使用看看，不过目前还没上架，可以下载源码来自己玩玩。<https://github.com/j0x7c4/hackstreet>

以前没有太多JS的开发经验，这次开发是不断掉进坑里，然后再从坑里爬出来，直到最后有个完整版本出来。先说说chrome插件的配置文件吧，插件中有个叫`manifest.json`的文件，他管理了插件中所需的所有东西。

##Hack现有网页的内容

由于我们的插件需要修改大众点评网现有网页内容，比如在网页中插入我们的街景视图(我们的街景功能是用了腾讯街景的API). 这个就需要让`content_scripts`来做，他主要包括三个字段，`matches`, `css`, 和`js`. 只要把自己的JS文件名放到它的`js`字段中，一旦访问的URL符合规则，就会执行js中的脚本。例如：

``` json
"content_scripts": [ 
{
    "matches":["http://www.dianping.com/shop/*"],
    "css":["bootstrap.css"],
    "js":["hackit.js"]
}
]
```

其中的CSS可以对自己添的内容制定样式。这个看似很简单，其实里面暗藏了一个大坑，不过也是因为自己太粗心，没有仔细看doc所导致的。由于我要在原有网页中嵌入一个街景视图，而街景视图用到了某企鹅的街景API，而那个API又必须是在线调用的。在普通的HTML中，要调用一个网上的脚本很方便，只需添加`<script>`标签，在`src`中指定脚本的URL。但是在chrome插件中，无法通过类似的方法，将脚本载入当前页面，并在插件的js脚本中调用。因为`content_scripts`中的脚本虽然可以访问当前页面的内容，但是无法调用当前页面中的js函数，这个在Chrome的开发文档中有提到：

>However, content scripts have some limitations. They cannot:
>
>Use chrome.* APIs (except for parts of chrome.extension)
>
>Use variables or functions defined by their extension's pages
>
>Use variables or functions defined by web pages or by other content scripts

<http://developer.chrome.com/extensions/content_scripts.html>

因此只能把企鹅的js载到本地啦，然后再hack一下那个脚本，因为在本地调用需要做些修改。

##还有一些小东西

开发chrome插件还有一些小东西可以分享一下，比如那个icon，文档中说最好是19x19的png图片，但如果真的把图片做成19x19，显示在浏览器中会比较糊（可能是因为我的retina屏幕）。其实把图片弄的大一点也是可以的，只要长宽比例是1:1就好。

如果在脚本中需要有一些跨域的请求，比如我将地址转化成经纬度时，是用到了google map的api, 我需要向`https://maps.googleapis.com/`发送请求，这就需要把`https://maps.googleapis.com/*`加入到`manifest.json`的`permissions`字段中。

还可以把一些公用的函数写在`background`的脚本中，然后通过message passing的方式去调用这些函数，不过具体效率还没测试过。在`background`中，可以直接使用`<script>`标签来添加在线的脚本。