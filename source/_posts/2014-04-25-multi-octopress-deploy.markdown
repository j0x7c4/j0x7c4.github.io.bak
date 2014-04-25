---
layout: post
title: "一台电脑中管理多个Octopress Blog"
date: 2014-04-25 16:51
comments: true
categories: 
- Tech
- Blog
- Octopress

---
尝试着在一台mac上使用两个不同的Octopress博客，这两个博客目前放在github的两个用户下，所以每个用户的priviate key和pubilc key都是不一样的。

上网找了一些方法，主要都是通过配置`~/.ssh/config`来实现，不过我按照那些方法做，都没成功。貌似只能识别`~/.ssh/id_rsa`和`~/.ssh/id_rsa.pub`. 于是就索性写个脚本，自动进行不同用户的private key和public key的切换。

我将`id_rsa`和`id_rsa.pub`的命名规则改成`id_rsa_xxx`和`id_rsa_xxx.pub`, 这个脚本需要输入一个参数表示`xxx`，就能进行切换。

个人感觉这种方式用起来更加方便。以下是脚本的源代码。

``` sh change-key.sh
if [ ! $1 ];
then
    echo "need role"
    exit 0
fi

private_key='id_rsa_'$1
public_key='id_rsa_'$1'.pub'

private_key_file='/Users/jie/.ssh/'$private_key
public_key_file='/Users/jie/.ssh/'$public_key

if [ -e $public_key_file ] && [ -e $private_key_file ];
then
    cp $public_key_file ~/.ssh/id_rsa.pub
    cp $private_key_file ~/.ssh/id_rsa
    echo $1" changed"
else
    echo "Can't find "$public_key_file" or "$private_key_file
fi
```
