
class Mat3 {
  constructor(mat = [
    0, 0, 0, 
    0, 0, 0, 
    0, 0, 0,
  ]) {
    this.usage = 0;
    this.mat = mat;
  }
  setUsage() {
    this.usage = 1;
  }
  setI() {
    this.mat = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ];
    this.setUsage();
    return this;
  }
  setRotate(angle) {
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    this.mat = [
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1,
    ];
    this.setUsage();
    return this;
  }
  setScale(xScale, yScale) {
    this.mat = [
      xScale, 0, 0,
      0, yScale, 0,
      0, 0, 1,
    ];
    this.setUsage();
    return this;
  }
  setTranslate(x, y) {
    this.mat = [
      1, 0, x,
      0, 1, y,
      0, 0, 1,
    ];
    this.setUsage();
    return this;
  }
  multiply(mat3) {
    return mat3.multiplyBy(this);
  }
  multiplyBy(mat3) {
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
    this.usage += 27;
    return new Mat3([
      a11, a12, a13,
      a21, a22, a23,
      a31, a32, a33,
    ]);
  }
  getCanvasTransform() {
    const mat = this.mat;
    this.usage += 1;
    return [mat[0], mat[3], mat[1], mat[4], mat[2], mat[5]];
  }
}

class Mat4 {
  constructor(mat = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ]){
    this.mat = mat;
    this.usage = 0;
  }
  setUsage() {
    this.usage = 1;
  };
  setI() {
    this.mat = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    this.setUsage();
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
    this.setUsage();
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
    this.setUsage();
    return this;
  }
  multiply(mat4) {
    return mat4.multiplyBy(this);
  }
  multiplyBy(mat4) {
    const a = this.mat;
    const b = mat4.mat;
    const a11 = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    const a12 = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    const a13 = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    const a14 = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
    const a21 = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    const a22 = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    const a23 = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    const a24 = a[4] * b[2] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
    const a31 = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    const a32 = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    const a33 = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    const a34 = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
    const a41 = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    const a42 = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    const a43 = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    const a44 = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
    this.usage += 64;
    return new Mat3([
      a11, a12, a13, a14,
      a21, a22, a23, a24,
      a31, a32, a33, a34,
      a41, a42, a43, a44,
    ]);    
  }
}

module.exports.Mat4 = Mat4;
module.exports.Mat3 = Mat3;


