---
layout: post
title: 在GAE上使用Database
categories:
- Coding
- Tech
tags:
- GAE
- Python
status: publish
type: post
published: true
meta:
  dsq_thread_id: ''
  _edit_last: '1'
---
很多应用都需要database的支持，GAE提供了不错的Database服务。

但是对于新手来讲，不是太容易理解GAE的database. GAE上的database称为datastore.

对于习惯于MySQL这种常见的SQL database的开发者来说，第一步当然是建立一个database, 然后又用户名，密码这些必要的东西。

但是对于GAE上的datastore来说，这些都不需要。在GAE上创建好的application, 就会分配到一个datastore, 免费quota 是有1GB的空间。至于用户名和密码，我目前还没发现在哪里需要验证，应该是在同一个application中就不需要验证了吧。

进入application的管理页面，在左边的column中能够看到Data那一栏，这个就是datastore的管理页面了。在Datastore Viewer里就能看到所有存储的data了。但是一开始里面是空的。

对于MySQL中table的概念，在GAE的datastore中是以Kind来表示。因为GAE是利用Google的Bigtable的感念，他没有像MySQL这样实际的table实体。

那一个Kind在code的层面上， 它是一个继承```db.Model class```的一个class.

以Python为例, 这是一个名叫Employee的class, 继承自db.Model. 也就是相当于MySQL中的一个```Employee table```：
```python
import datetime
from google.appengine.ext import db
class Employee(db.Model):
    first_name = db.StringProperty()
    last_name = db.StringProperty()
    hire_date = db.DateProperty()
    attended_hr_training = db.BooleanProperty()
```
其中```first_name```, ```last_name```这些property, 就是相当于一般MySQL table中的每个column字段. 然后```db.StringProperty()```这就是定义字段的类型.

接下来,可以建立Employee class的instance, 然后给其中的property赋值. 最后使用```.put()```这个method就可以将数据存到datastore中了.
```python
employee = Employee(first_name='Antonio', last_name='Salieri')
employee.hire_date = datetime.datetime.now().date()
employee.attended_hr_training = True
employee.put()
```
以上是相当于SQL语句中的Insert语句。
