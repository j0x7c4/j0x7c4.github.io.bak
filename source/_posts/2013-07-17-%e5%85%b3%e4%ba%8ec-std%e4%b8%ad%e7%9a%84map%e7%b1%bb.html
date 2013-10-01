---
layout: post
title: 关于C++ std::map
categories:
- Coding
- Tech
- Theory
tags:
- C++
status: publish
type: post
published: true
meta:
  dsq_thread_id: '1593469042'
  _edit_last: '1'
---
C++的std::map是个很好用的东西，将key和value进行对应，而且可以是任意类型的key.

以前一直没有研究过具体这个MAP是怎么实现的，只是大概的知道它是一个binary search tree. 那如果一个key不是数字，字符串这种相对简单的类型的时，而是一个vector, 或者一个pair类型的对象时，key要如何对应value呢？

我在Quora上提了这个问题，很快就有人回答了。
<blockquote>std::map is a self-balancing binary search tree ordered using a comparator, whose type is given as the third template parameter to std::map. If you don't give this template parameter, it defaults to std::less&lt;KeyType&gt;. std::less is basically a function object wrapper around the "&lt;" operator. The &lt; operator is defined for types like int, as well as for std::pair (which compares lexicographically).</blockquote>
Map中的Key会按照它自己的类中定义的less运算符去比较大小，如果像vector, pair这种多元素的对象，会根据里面所有数据的字典序来进行大小的判断。
