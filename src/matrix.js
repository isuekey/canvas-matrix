
class Mat3 {
  constructor(mat = [
    0, 0, 0, 
    0, 0, 0, 
    0, 0, 0,
  ]) {
    this.mat = mat;
  }
  setI() {
    this.mat = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ];
    return this;
  }
  setRotate(angle = 0) {
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    this.mat = [
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1,
    ];
    return this;
  }
  setScale(xScale=1, yScale=1) {
    this.mat = [
      xScale, 0, 0,
      0, yScale, 0,
      0, 0, 1,
    ];
    return this;
  }
  setTranslate(x=0, y=0) {
    this.mat = [
      1, 0, x,
      0, 1, y,
      0, 0, 1,
    ];
    return this;
  }
  multiply(mat3) {
    if (typeof mat3 == 'number') {
      return new Mat3(this.mat.map(ele => ele * mat3));
    }
    return mat3.multiplyBy(this);
  }
  handleMultiplyBy(mat3) {
    const a = this.mat;
    const b = mat3.mat;
    const a11 = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
    const a12 = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
    const a13 = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];
    const a21 = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
    const a22 = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
    const a23 = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];
    const a31 = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
    const a32 = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
    const a33 = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];
    return [
      a11, a12, a13,
      a21, a22, a23,
      a31, a32, a33,
    ];
  }
  multiplyBy(mat3) {
    if (typeof mat3 == 'number') {
      return new Mat3(this.mat.map(ele => ele * mat3));
    }
    return new Mat3(this.handleMultiplyBy(mat3));
  }
  getCanvasTransform() {
    const mat = this.mat;
    return [mat[0], mat[3], mat[1], mat[4], mat[2], mat[5]];
  }
  getElement(row, col) {
    return this.mat[row * 3 + col];
  }
}
Mat3.prototype[Symbol.toStringTag]='Matrix3';

class Mat3Dev extends Mat3 {
  constructor(mat = [
    0, 0, 0, 
    0, 0, 0, 
    0, 0, 0,
  ]) {
    super(mat);
    this.usage = 0;
  }
  setUsage(usage=1) {
    this.usage = usage;
  }
  setI() {
    this.setUsage();
    super.setI();
    return this;
  }
  setRotate(angle) {
    super.setRotate(angle);
    this.setUsage(5);
    return this;
  }
  setScale(xs, ys) {
    super.setScale(xs, ys);
    this.setUsage();
    return this;
  }
  setTranslate(x, y) {
    super.setTranslate(x, y);
    this.setUsage();
    return this;
  }
  multiply(mat3) {
    this.usage += 27;
    return mat3.multiplyBy(this);
  }
  multiplyBy(mat3) {
    const newMat3 = super.handleMultiplyBy(mat3);
    this.usage += 27;
    return new Mat3Dev(newMat3);
  }
}
Mat3Dev.prototype[Symbol.toStringTag]='Matrix3Dev';

class Mat4 {
  constructor(mat = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ]){
    this.mat = mat;
  }
  setI() {
    this.mat = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    return this;
  }
  setRotate(angle, axis=[0, 0, 1]) {
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    this.mat = [
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    return this;
  }
  setScale(xs, ys, zs) {
    this.mat = [
      xs, 0, 0, 0,
      0, ys, 0, 0,
      0, 0, zs, 0,
      0, 0, 0, 1,
    ];
    this.setUsage();
    return this;
  }
  setTranslate(x, y, z) {
    this.mat = [
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1,
    ];
    return this;
  }
  multiply(mat4) {
    return mat4.multiplyBy(this);
  }
  handleMultiplyBy(mat4) {
    const a = this.mat;
    const b = mat4.mat;
    return [
      a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
      a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
      a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
      a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],
      a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
      a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
      a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
      a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],
      a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
      a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
      a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
      a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],
      a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
      a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
      a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
      a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15],
    ];
  }
  multiplyBy(mat4) {
    const a = this.mat;
    const b = mat4.mat;
    return new Mat4(this.handleMultiplyBy(mat4));
  }
  getElement(row, col) {
    return this.mat[row * 4 + col];
  }
}
Mat4.prototype[Symbol.toStringTag]='Matrix4';
class Mat4Dev extends Mat4 {
  constructor(mat = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ]) {
    super(mat);
    this.usage = 0;
  }
  setUsage(usage=1) {
    this.usage = usage;
  }
  setI() {
    this.setUsage();
    super.setI();
    return this;
  }
  setRotate(angle) {
    super.setRotate(angle);
    this.setUsage(16);
    return this;
  }
  setScale(xs, ys) {
    super.setScale(xs, ys);
    this.setUsage();
    return this;
  }
  setTranslate(x, y) {
    super.setTranslate(x, y);
    this.setUsage();
    return this;
  }
  multiply(mat4) {
    this.usage += 64;
    return mat4.multiplyBy(this);
  }
  multiplyBy(mat4) {
    const newMat4 = super.handleMultiplyBy(mat4);
    this.usage += 64;
    return new Mat4Dev(newMat4);
  }
}
Mat4Dev.prototype[Symbol.toStringTag]='Matrix4Dev';

module.exports.Mat4 = Mat4;
module.exports.Mat3 = Mat3;
module.exports.Mat4Dev = Mat4;
module.exports.Mat3Dev = Mat3Dev;

