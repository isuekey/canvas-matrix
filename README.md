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

