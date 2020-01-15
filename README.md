# Matrix For Canvas #
  * usage
  * files
  * classes

## Usage ##
  * install
  * import

### install ###
  * npm install canvas-matrix

#### node ####
  * const matrix = require('canvas-matrix');
  * const { Mat3, Mat4 } = matrix;
  * const transform = new Mat3().setTranslate(xm,ym)
    .multipleBy(new Mat3().setScale(xs, ys))
    .multipleBy(new Mat3().setRotate(degree))
    .getCanvasTransform();

#### webpack es6 ####
  * import * as matrix from 'canvas-matrix';

# 中文说明 #

## 使用 ##
  * npm install canvas-matrix
  * import { Mat3, Mat4 } from 'canvas-matrix';
  * const transform = new Mat3().setRotate(90).thenScale(2, 2).thenTranslate(1, 2).getCanvasTransform();//获得一个数组。an array, length 6

## 处理图片提示 ##
  * 首先获取canvas的宽度与高度的一半 canvasHalfWidth, canvasHalfHeight，
  * 获取图片的宽高的一般, imageHalfWidth, imageHalfHeight，
  * canvas的2dcontext：context2d，
  * const trans = new Mat3().setRotate(0).thenScale(1,1).thenTranslate(canvasHalfWidth, canvasHalfHeight);
  * context2d.setTransform(...trans.getCanvasTransform());
  * context2d.drawImage(image, - imageHalfWidth, - imageHalfHeight);
  * 这样操作出来的图片会在canvas的正中。
  * 旋转与缩放是基于原点，而平移是在原有位置上的。所以将图片中心与canvas原点重合进行绘制，可以有效的简化操作逻辑。


