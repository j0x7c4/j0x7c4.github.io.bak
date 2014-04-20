---
layout: post
title: "简单的iOS互动"
date: 2014-02-01 01:57
comments: true
categories: 
- iOS
- Objective-C
- Tech
- 学习开发移动APP
keywords: 
description: 
---
最近想开发iOS上的app，却发现以前上课时学的iOS开发已经忘的差不多了，于是决定重拾objective-c，和iOS的开发。

我在看Beginning iOS 6 Development Exploring the iOS SDK 一书，这书有中文的翻译版，也翻译的不错，但还是看原版比较有感觉。实体书价格不菲，而且iOS7的版本也快出版了，觉得现在买一本iOS6的不太合适，所以还是在网上找了pdf，先看起来，等出了iOS7的版本后再买吧。

{% img http://img5.douban.com/lpic/s26815358.jpg %}

iOS的开发也是MVC(Model-View-Controller)的框架，目前是个流行的开发框架。在Chapter 4中，作者介绍了如何构建简单的互动（通过按钮改变文字的内容）。其中提到了`Outlet`和`Action`两个东西，`Outlet`是controller中的对象，他会映射到view中的一个真实的元素。`Action`是controller的方法，他反映了view中一个元素的动作，就是说view中的某个元素触发了一个事件（比如按钮被按了一下），会执行相应的action方法。

创建view中的元素很方便，在storyboard中拖出一个UI元素来，然后按住`control`键，再拖动指针，拉到`xxController.h`中的interface中，就能选择是创建一个`Outlet`还是一个`Action`. 也可以事先在`xxController.h`中创建好相应的`Outlet`对象和`Action`方法，然后按住`control`，指针拖动到这些对象和方法上时，会自动高亮这些代码，放开指针，就能创建映射。不过我还是觉得先创建UI元素，再拖动指针自动创建`Outlet`或者`Action`比较方便。

在`xxController.h`中进行声明之后，可以在`xxController.m`中把代码实现。

``` objectivec BIDViewController.h
#import <UIKit/UIKit.h>

#ifndef IBOutlet
#define IBOutlet
#endif

@interface BIDViewController : UIViewController

@property (weak, nonatomic) IBOutlet UILabel *statusLabel;
- (IBAction)buttonPressed:(id)sender;

@end
```

``` objectivec BIDViewController.m
#import "BIDViewController.h"

@implementation BIDViewController

- (IBAction)buttonPressed:(id)sender {
  NSString *title = [sender titleForState:UIControlStateNormal];
  NSString *text = [NSString stringWithFormat:@"%@ button pressed.",title];
  _statusLabel.text = text;
}
@end
```