---
layout: post
title: "改版octopress 之 安装"
categories:
- Tech
tags:
- octopress
- ruby
status: publish
comments: true
type: post
published: true
meta:
  dsq_thread_id: '1813256478'
  _edit_last: '1'
---
心血来潮想把博客从wordpress改成octopress, 毕竟在heroku上想用wordpress上传照片不太方便，而且比起静态网页来，速度慢很多。

但是我之前没有碰过ruby，一步一步按照网上的guide慢慢来。

首先从git上抓来octopress
```
git clone git@github.com:imathis/octopress.git
```
然后进入octopress目录下，build源代码
```
cd octopress
bundle install
rake install
```
以上几步都没有问题，然后执行
```
rake preview
```
然后问题就来了，出现了错误

Starting to watch source with Jekyll and Compass. Starting Rack on port 4000
rake aborted!
undefined method `spawn' for Process:Module

因为octopress需要ruby 1.9.3，而我原本mac上的ruby是1.8.3. 所以要把ruby更新到1.9.3才能用

网上看了一遍后，用RVM可以很好的管理ruby的版本，可以方便的在多个ruby版本中进行切换，还能很方便的安装新版的ruby.

我安装stable版本的rvm
```
curl -L https://get.rvm.io | bash -s stable
```
然后将rvm写到用户环境中。
```
echo "source $HOME/.rvm/scripts/rvm" &gt;&gt; ~/.bash_profile
```
具体详见 <a href="https://rvm.io/rvm/install">https://rvm.io/rvm/install</a>

然后使用rvm来安装1.9.3版本的ruby.
```
rvm install ruby-1.9.3-p448
```
不过在这之前，要先确定安装了xcode的command line tools.

可能因为国内网络的原因，这个安装过程相当的漫长，我觉得应该先去吃个午饭比较好。。。
