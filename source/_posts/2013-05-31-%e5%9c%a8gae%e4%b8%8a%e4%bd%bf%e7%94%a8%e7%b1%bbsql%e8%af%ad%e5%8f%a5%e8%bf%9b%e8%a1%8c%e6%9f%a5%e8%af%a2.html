---
layout: post
title: 在GAE上使用类SQL语句进行查询
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
  _edit_last: '1'
---
GAE上的Datastore虽然不是SQL的Database， 但是他提供了GQL语句进行类似SQL的查询。因为是类似SQL，所以不是完全等同于SQL语句。SQL语句中常用的count, group在GQL中就没有。

以下是GQL支持的格式，具体可以参见reference <a href="https://developers.google.com/appengine/docs/python/datastore/gqlreference" target="_blank">https://developers.google.com/appengine/docs/python/datastore/gqlreference</a>
<pre class="lang:tsql decode:true ">SELECT [* | &lt;property list&gt; | __key__]
  [DISTINCT]
  [FROM &lt;kind&gt;]]
  [WHERE &lt;condition&gt; [AND &lt;condition&gt; ...]]
  [ORDER BY &lt;property&gt; [ASC | DESC] [, &lt;property&gt; [ASC | DESC] ...]]
  [LIMIT [&lt;offset&gt;,]&lt;count&gt;]
  [OFFSET &lt;offset&gt;]

  &lt;property list&gt; := &lt;property&gt; [, &lt;property&gt; ...]
  &lt;condition&gt; := &lt;property&gt; {&lt; | &lt;= | &gt; | &gt;= | = | != } &lt;value&gt;
  &lt;condition&gt; := &lt;property&gt; IN &lt;list&gt;
  &lt;condition&gt; := ANCESTOR IS &lt;entity or key&gt;
  &lt;list&gt; := (&lt;value&gt; [, &lt;value&gt; ...]])</pre>
在Datastore 中有3种方式可以对数据进行查询：
<pre class="lang:python decode:true">class Person(db.Model):
    first_name = db.StringProperty()
    last_name = db.StringProperty()
    city = db.StringProperty()
    birth_year = db.IntegerProperty()
    height = db.IntegerProperty()

# Query interface constructs a query using instance methods
q = Person.all()
q.filter("last_name =", "Smith")
q.filter("height &lt;=", max_height)
q.order("-height")

# GqlQuery interface constructs a query using a GQL query string
q = db.GqlQuery("SELECT * FROM Person " +
                "WHERE last_name = :1 AND height &lt;= :2 " +
                "ORDER BY height DESC",
                "Smith", max_height)

# Query is not executed until results are accessed
for p in q.run(limit=5):
    print "%s %s, %d inches tall" % (p.first_name, p.last_name, p.height)</pre>
个人感觉，还是GQL的方式比较直觉，用起来比较灵活。但是如果对于简单的数据查询，可能第一种方式更加有效, code会比较精简。

如果要在GQL中实现Group的功能，那就要分两步走。

按照上面那个例子，如果要把人按照城市来分组，那就要先把城市找出来，GQL就写成
<pre class="lang:python decode:true ">q = db.GqlQuery("SELECT DISTINCT city FROM Person")
result = []
for item in q:
    people = []
    sq = db.GqlQuery("SELECT * FROM person WHERE city = '"+item.city+"'")
    for item2 in sq:
        people.append({"first_name":item2.first_name,"second_name":item2.second_name})
    result.append({"city":item.city,"people":people})</pre>
这就是比较简单的GAE上的数据查询操作。
