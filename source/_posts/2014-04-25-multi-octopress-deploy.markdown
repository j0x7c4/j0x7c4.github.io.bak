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

``` sh
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
