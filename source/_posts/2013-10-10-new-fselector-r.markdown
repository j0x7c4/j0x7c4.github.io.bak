---
layout: post
title: "Feature Selection in R is EASY!"
date: 2013-10-10 23:43
comments: true
categories: 
- Tech
- R
tags:
- R
keywords: R, FSelector
description: 
---
最早认识R语言是看到一本书叫做<i>"Machine Learning for Hackers"</i>, 听说R在machine learning的研究方面很有用处，就是一个专门为Machine Learning而生的语言，不过一直没用仔细研究过。在网上寻找Feature Selection方面的工具时，看到有人推荐R的package <a href=http://cran.r-project.org/web/packages/FSelector/FSelector.pdf>FSelector</a> . 于是就载下来尝试一下，结果发现真的很方便。

####R可以方便的使用现成的benchmark（比如`iris`），只要一句话就可以轻松导入数据！

下面是一个简单的例子使用FSelector, 采用cvs来寻找feature的子集。其中第一个参数Species~表示数据集iris中的类别(label).

```r
library(FSelector)
data(iris)
subset <- cfs(Species~., iris)
f <- as.simple.formula(subset, "Species")
print(f)
```
下面这个例子比较高阶，可以自己指定评价feature子集的好坏。采用best first search的策略来寻找子集。其中evaluator训练了rpart model，通过计算error rate来评价feature的好坏。

```r
library(FSelector)
library(rpart)
data(iris)
evaluator <- function(subset) {
  #k-fold cross validation
  k <- 5
  splits <- runif(nrow(iris))
  results = sapply(1:k, function(i) {
    test.idx <- (splits >= (i - 1) / k) & (splits < i / k)
    train.idx <- !test.idx
    test <- iris[test.idx, , drop=FALSE]
    train <- iris[train.idx, , drop=FALSE]
    tree <- rpart(as.simple.formula(subset, "Species"), train)
    error.rate = sum(test$Species != predict(tree, test, type="c")) / nrow(test)
    return(1 - error.rate)
  })
  #print(subset)
  #print(mean(results))
  return(mean(results))
}
subset <- best.first.search(names(iris)[-5], evaluator)
f <- as.simple.formula(subset, "Species")
print(f)
```
###iris
This famous (Fisher's or Anderson's) iris data set gives the measurements in centimeters of the variables sepal length and width and petal length and width, respectively, for 50 flowers from each of 3 species of iris. The species are Iris setosa, versicolor, and virginica.

###cfs
The algorithm finds attribute subset using correlation and entropy measures for continous and discrete data.

##Hints
+ 虽然原生的R语言的IDE也不错用，但是发现一个更加强大的IDE，RStudio, 真是可以媲美matlab的IDE了。
+ R语言也可以在命令行中用batch的方式来运行，具体指令是```R CMD BATCH [options] infile [outfile]```, infile就是R的脚本文件，R的输出一般无法显示到STDOUT中，是以文件的形式存起来。如果没有指定outfile，就会以原文件名的方式来命名。在脚本执行的时候，很多无关紧要的内容也会被输出，可以使用options命令的`--slave`. 在最后的输出中，他也会很好心的帮你计算运行时间，如果不需要，也可以加`--no-timing`. 详见<http://stat.ethz.ch/R-manual/R-devel/library/utils/html/BATCH.html>