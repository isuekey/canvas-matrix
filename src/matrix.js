"use strict";

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
  setRotate(angle= 0) {
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    this.mat = [
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1,
    ];
    return this;
  }
  thenRotate(angle=0) {
    return new Mat3().setRotate(angle).multiplyBy(this);
  }
  setScale(xScale=1, yScale=1) {
    this.mat = [
      xScale, 0, 0,
      0, yScale, 0,
      0, 0, 1,
    ];
    return this;
  }
  thenScale(xScale=1, yScale=1) {
    return new Mat3().setScale(xScale, yScale).multiplyBy(this);
  }
  setTranslate(x=0, y=0) {
    this.mat = [
      1, 0, x,
      0, 1, y,
      0, 0, 1,
    ];
    return this;
  }
  thenTranslate(x=0, y=0) {
    return new Mat3().setTranslate(x, y).multiplyBy(this);
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
    return [
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
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
  transpose() {
    const a = this.mat;
    return new Mat3([
      a[0], a[3], a[6],
      a[1], a[4], a[7],
      a[2], a[5], a[8],
    ]);
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
  setRotate(angle=0, axis=[0, 0, 1]) {
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    const [xr , yr, zr] = axis;
    const range = xr*xr + yr*yr + zr*zr;
    const m = Math.sqrt(range);
    // 这里防御去掉了，自行处理
    const [x, y, z] = [xr*m/range, yr*m/range, zr*m/range];
    const cos1 = 1-cos, sin1 = 1-sin;
    this.mat = [
      cos + cos1*x*x, cos1*x*y - sin*z, cos1*x*z + sin*y, 0,
      cos1*y*x + sin*z, cos + cos1*y*y, cos1*y*z - sin*x, 0,
      cos1*z*x - sin*y, cos1*z*y + sin*x, cos+cos1*z*z, 0,
      0, 0, 0, 1,
    ];
    return this;
  }
  thenRotate(angle=0, axis=[0, 0, 1]) {
    return new Mat4().setRotate(angle, axis).multiplyBy(this);
  }
  setScale(xs=1, ys=1, zs=1) {
    this.mat = [
      xs, 0, 0, 0,
      0, ys, 0, 0,
      0, 0, zs, 0,
      0, 0, 0, 1,
    ];
    return this;
  }
  thenScale(xs, ys, zs) {
    return new Mat4().setScale(xs, ys, zs).multiplyBy(this);
  }
  setTranslate(x=0, y=0, z=0) {
    this.mat = [
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1,
    ];
    return this;
  }
  thenTranslate(x, y, z) {
    return new Mat4().setTranslate(x, y, z).multiplyBy(this);
  }
  multiply(mat4) {
    if(typeof mat4 == 'number') {
      return new Mat4(this.mat.map(ele => ele * mat4));
    }
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
    if(typeof mat4 == 'number') {
      return new Mat4(this.mat.map(ele => ele * mat4));
    };
    const a = this.mat;
    const b = mat4.mat;
    return new Mat4(this.handleMultiplyBy(mat4));
  }
  getElement(row, col) {
    return this.mat[row * 4 + col];
  }
  transpose() {
    const a = this.mat;
    return new Mat4([
      a[0], a[4], a[8], a[12],
      a[1], a[5], a[9], a[13],
      a[2], a[6], a[10], a[14],
      a[3], a[7], a[11], a[15],
    ]);
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
  setRotate(angle=0, axis=[0,0,1]) {
    super.setRotate(angle, axis);
    this.setUsage(16);
    return this;
  }
  setScale(xs=1, ys=1, zs=1){
    super.setScale(xs, ys, zs);
    this.setUsage();
    return this;
  }
  setTranslate(x=0, y=0,z=0) {
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

module.exports = {
  Mat4, Mat3, Mat4Dev, Mat3Dev
};

