---
layout: post
title: "搭建能在天朝使用的web app"
date: 2013-11-30 20:23
comments: true
categories: 
- Tech
keywords: 
description: 
---
对于像我这种整天感觉很闲的人，总是会在代码中寻找自己的小世界，没事就写个web应用。可是身处天朝，资源有限。国际上很多知名的服务都不能用，比如某G的app engine. 不过还是有些漏网之鱼，没有完全被墙的。比如Heroku <http://www.heroku.com>. (你现在看到的这个博客，就是放在heroku上的 >_< )

Heroku是通过git的方式将本地的代码部署到云上。前面讲到它没有完全被墙，因为放在它上面的app在国内是可以访问的，但是通过git部署的过程，是被墙的。所以我都是需要VPN才能将代码部署到heroku上。Heroku支持很多语言，我最常用的就是python了。刚刚用Django在Heroku上部署了一个web app. 可以参照下面这篇文章，在heroku上部署django <https://devcenter.heroku.com/articles/getting-started-with-django>

如果在django中需要用到SESSION或者COOKIE的话，是需要使用heroku提供的数据库的。因为在heroku上程序无法在运行的时候创建静态文件，所以它们是变相的存储在数据库中的。数据库添加可以进入网站的dashboard，在add-on中添加一个免费的Heroku Postgresql. 免费的额度支持10MB的数据库(感觉有点小=_=).

{% img https://addons.heroku.com/provider/addons/heroku-postgresql/icons/catalog.png %}

于是乎，我就想到了GAE，它免费的数据库支持到了1GB. 虽然他上面的服务在天朝无法访问，但是如果请求是从heroku发出去的，然后heroku再就收GAE传回的数据显示在app上，就没问题了！带着这个想法，我在GAE上部署了一个数据库，用来存放一些数据，之前的文章中有提到如何在GAE上使用数据库。

###<a href="/blog/2013/05/31/SQL-like-at-GAE">在GAE上使用类SQL语句进行查询</a>

###<a href="/blog/2013/05/31/database-at-GAE/">在GAE上使用Database</a>

下面这个例子是一张Inverted_index表中，存2个字段，并且实现两个方法去获取资料：

``` python
from google.appengine.ext import db

class Inverted_index ( db.Model ):
	id = db.IntegerProperty()
	word = db.StringProperty()

	def get (self,**kwargs):
		if not kwargs.keys():
			q = self.all()
			return [ {"id":item.id, "word":item.word } for item in q ]
		if 'ids' in kwargs:
			ids_set = ','.join(set(kwargs['ids']))
			q = db.GqlQuery("SELECT * FROM Inverted_index WHERE id in (%s)"%(ids_set))
			return dict(zip([int(item.id) for item in q],[item.word for item in q]))
		if 'words' in kwargs:
			words_set = ','.join(set(kwargs['words']))
			q = db.GqlQuery("SELECT * FROM Inverted_index WHERE word in (%s)"%(words_set))
			return dict(zip([item.word for item in q],[int(item.id) for item in q]))
		

	def get_id_list_by_doc ( self, word_list ):
		word_to_id = self.get(words=word_list)
		return [word_to_id[word] for word in word_list]
```

##另外介绍个可以部署在GAE的分词器

这个分词器用纯python来写，网上看到很多人都推荐。

<https://github.com/fxsjy/jieba>

但是部署在GAE上需要修改一个地方，不然可能会出错：
将`jieba`中的`__init__.py`的78-81行修改成这样。因为如果使用原来的系统临时文件夹来存放cache文件，会出错。于是我直接把存放cache的目录设置成当前目录。

``` python
if abs_path == os.path.join(_curpath,"dict.txt"): #defautl dictionary
    cache_file = os.path.join('.',"jieba.cache")
else: #customer dictionary
    cache_file = os.path.join('.',"jieba.user."+str(hash(abs_path))+".cache")
```

在使用上，可以调用`jieba.cut`，也可以调用`jieba.finalseg.cut`，两者的区别还没仔细研究，但是如果在GAE上使用前者的话，会出现内存使用过大，然后被系统kill掉进程的问题。用后者就没问题了。具体例子如下：

``` python
import sys
import webapp2
from jieba import finalseg

class Segment(webapp2.RequestHandler):
    def get(self):
        text = self.request.get('text')
        seg_list = finalseg.cut(text)
        text = ' '.join(seg_list)
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(text)

    def post(self):
        text = self.request.get('text')
        seg_list = finalseg.cut(text)
        text = ' '.join(seg_list)
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(text)

app = webapp2.WSGIApplication([
    ('/api/segment', Segment),
    ],debug=True)
```

以上比较粗略的介绍了一下在网上利用免费资源搭建web app的方法。最近在鼓捣一个跟微博相关的东西，我就是利用了HEROKU和GAE来实现的。
###啊! 微博 <http://rweibo.herokuapp.com/>
因为app还没上线，所以需要有将微博账号添加到app的测试账号中才能使用。想要尝试的话，可以私聊~