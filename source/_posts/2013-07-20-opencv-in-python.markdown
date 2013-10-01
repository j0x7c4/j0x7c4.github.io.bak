---
layout: post
title: OpenCV in Python
categories:
- Coding
- Tech
tags:
- opencv
- Python
status: publish
type: post
published: true
meta:
  dsq_thread_id: '1795205197'
  _edit_last: '1'
---
OpenCV基本上每個學Computer Vision都用過，我之前也是用C++來使用OpenCV, 最近為了處理一些圖片轉影片，加Marker之類的簡單的操作，懶得再用C++去寫。於是就嘗試用Python來寫OpenCV.

在Python中使用OpenCV, 只要把OpenCV的Library加到Python的Lib目錄下面就可以了。

具體就是把OpenCV目錄下的”build/python/2.7/cv2.pyd" 複製到Python的“Lib/site-packages”目錄中。

OpenCV被包在cv2这个module中，在一开始加载这个module就可以了。

OpenCV中经常会用到cv::Size, cv::Point, 在python中就用tuple来代替，不用再定义cv::Size或者cv::Point. 比如原来C++中定义一个size用cv::Size(640,480), 现在Python中直接用(640,480)来代替就好了。

下面这个例子就是把image_dir中的图片转换成avi格式的影片
``` python
import sys
import os
import cv2
import re
def intCmp ( x,y ):
	a = re.search('([\d]+).png',x).group(1)
	b = re.search('([\d]+).png',y).group(1)
	return int(a)-int(b)
if __name__ == '__main__':
	if len(sys.argv)<3:
		print "Usage: %s (image_dir) (output)" %(sys.argv[0])
		exit(1)
	image_dir = sys.argv[1]
	output_file = sys.argv[2]
	image_list = sorted(os.listdir(image_dir),cmp=intCmp)
	video_writer = cv2.VideoWriter(output_file,-1,30,(640,480))
	for image_file in image_list:
		print image_file
		img = cv2.imread("%s/%s"%(image_dir,image_file.strip()))
		cv2.imshow("rgb",img)
		key = cv2.waitKey(10)
		video_writer.write(img)
		if key == 27:
			break;
```
更多的细节可以看document

<a href="http://docs.opencv.org/modules/refman.html">http://docs.opencv.org/modules/refman.html</a>
