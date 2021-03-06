const { Mat3, Mat3Dev, Mat4, Mat4Dev } = require('../index.js');
const chai = require('chai');
const { assert, expect, should } = chai;

describe('Mat3', () => {
  before(() => {
    const mat3 = new Mat3();
    it('is a Matrix3 instance', () => {
      expect(mat3).to.be.a('Matrix3');
    });
    it('the mat will be [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      expect(mat3.mat).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });
  describe('setI()', () => {
    const mat3 = new Mat3().setI();
    it('the mat will be [1, 0, 0, 0, 1, 0, 0, 0, 1]', () => {
      expect(mat3.mat).to.deep.equal([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
  });
  describe('setRotate()', () => {
    it('the mat will rotate 30 degree', () => {
      const mat3 = new Mat3().setRotate(30);
      const cos = Math.cos(30 * Math.PI / 180);
      const sin = Math.sin(30 * Math.PI / 180);
      expect(mat3.mat).to.deep.equal([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
    });
    it('the mat will rotate 45 degree', () => {
      const mat3 = new Mat3().setRotate(45);
      const cos = Math.cos(45 * Math.PI / 180);
      const sin = Math.sin(45 * Math.PI / 180);
      expect(mat3.mat).to.deep.equal([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
    });
  });
  describe('setScale()', () => {
    it('the mat will scale xscale,yscale', () => {
      const xscale = 3, yscale = 4.5;
      const mat3 = new Mat3().setScale(xscale, yscale);
      expect(mat3.mat).to.deep.equal([xscale,0, 0, 0, yscale, 0, 0, 0, 1]);
    });
  });
  describe('setTranslate()', () => {
    it('the mat will move xm, ym', () => {
      const xm = 2, ym = 3.5;
      const mat3 = new Mat3().setTranslate(xm, ym);
      expect(mat3.mat).to.deep.equal([1 ,0, xm, 0, 1, ym, 0, 0, 1]);
    });
  });
  describe('handleMultiplyBy()', () => {
    it('the mat will check I * A = A', () => {
      const i = new Mat3().setI();
      const a = new Mat3().setScale(4, 11);
      const r = a.multiply(i);
      expect(r.mat).to.deep.equal(a.mat);
    });
    it('the mat will check A * I = A', () => {
      const i = new Mat3().setI();
      const a = new Mat3().setScale(4, 11);
      const r = a.multiplyBy(i);
      expect(r.mat).to.deep.equal(a.mat);
    });
    it('the mat will check A * 0 = 0', () => {
      const i = new Mat3([ 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const a = 0;
      const r = i.multiplyBy(a);
      expect(r.mat).to.deep.equal(new Array(9).fill(0));
    });
    it('the mat will check A * 5 = 5 * A = 5A', () => {
      const s0 = new Array(9).fill(0).map((e, i) => i + 1);
      const a = 5;
      const s = s0.map(ele => ele * a);
      const i = new Mat3(s0);
      const r = i.multiplyBy(a);
      expect(r.mat).to.deep.equal(s);
      const r2 = i.multiply(a);
      expect(r2.mat).to.deep.equal(s);
      expect(r2.mat).to.deep.equal(r.mat);
    });
    it('check A * B != B * A', () => {
      const s0 = new Array(9).fill(0).map((e, i) => i + 1);
      const s1 = [...s0].reverse();
      const A = new Mat3(s0);
      const B = new Mat3(s1);
      const ab = A.multiplyBy(B);
      const ba = A.multiply(B);
      expect(ab.mat).to.deep.not.equal(ba.mat);
      expect(ab.mat).to.deep.equal([30, 24, 18, 84, 69, 54, 138, 114, 90]);
      expect(ba.mat).to.deep.equal([90, 114, 138, 54, 69, 84, 18, 24, 30]);
      //这种对称性，仅仅是因为数据特殊造成的，没有啥普遍意义
    });
    describe('check A * B', () => {
      const s0 = new Array(9).fill(0).map((e) => (Math.random() * 100));
      const s1 = new Array(9).fill(0).map((e) => (Math.random() * 100));
      const A = new Mat3(s0);
      const B = new Mat3(s1);
      const ab = A.multiplyBy(B);
      const step = 3;
      ab.mat.forEach((ele,idx) => {
        const row = Math.floor(idx / step);
        const col = idx % step;
        it(`ab[${row +1}, ${col+1}] = sum(A[row, i] * B[i, col], i in 0-${step})`, () => {
          let sum = 0;
          for (let idx = 0; idx < step; ++idx) {
            sum += A.getElement(row, idx) * B.getElement(idx, col);
          }
          expect(ele).to.equal(sum);
        });
      });
    });
  });
  describe('thenRotate', () => {
    it('check A.thenRotate == setRotate.multiplyBy(A)', () => {
      const mat3 = new Array(9).fill(0).map(ele => Math.floor(Math.random() * 100));
      const A = new Mat3(mat3);
      const deg = Math.random()*360;
      const thenRotate = A.thenRotate(deg);
      const matrix = new Mat3().setRotate(deg).multiplyBy(A);
      expect(thenRotate.mat).to.deep.equal(matrix.mat);
    });
  });
  describe('thenScale', () => {
    it('check A.thenScale == setScale.multiplyBy(A)', () => {
      const mat3 = new Array(9).fill(0).map(ele => Math.floor(Math.random() * 100));
      const A = new Mat3(mat3);
      const [xs, ys] = [Math.random()*100, Math.random()*100];
      const thenScale = A.thenScale(xs, ys);
      const matrix = new Mat3().setScale(xs, ys).multiplyBy(A);
      expect(thenScale.mat).to.deep.equal(matrix.mat);
    });
  });
  describe('thenTranslate', () => {
    it('check A.thenTranslate == setTranslate.multiplyBy(A)', () => {
      const mat3 = new Array(9).fill(0).map(ele => Math.floor(Math.random() * 100));
      const A = new Mat3(mat3);
      const [xm, ym] = [Math.random()*100, Math.random()*100];
      const thenTranslate = A.thenTranslate(xm, ym);
      const matrix = new Mat3().setTranslate(xm, ym).multiplyBy(A);
      expect(thenTranslate.mat).to.deep.equal(matrix.mat);
    });
  });
});

describe('Mat3Dev', () => {
  before(() => {
    const mat3 = new Mat3Dev();
    it('is a Matrix3 instance', () => {
      expect(mat3).to.be.a('Matrix3');
    });
    it('the mat will be [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      expect(mat3.mat).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });
  describe('setUsage()', () => {
    const mat3 = new Mat3Dev();
    before(() =>{
      it('the usage begins from 0', () => {
        expect(mat3.usage).to.equal(0);
      });
    });
    it('set usage to be 1', () => {
      mat3.setUsage();
      expect(mat3.usage).to.equal(1);
    });
  });
  describe('handleMultiplyBy()', () => {
    it('the mat will check multiply usage', () => {
      const i = new Mat3Dev().setI();
      const a = new Mat3Dev().setScale(4, 11);
      const iuse = i.usage;
      const ause = a.usage;
      const r = a.multiply(i);
      expect(a.usage).to.equal(ause + 27);
      expect(i.usage).to.equal(iuse + 27);
      expect(r.usage).to.equal(0);
      expect(r.mat).to.deep.equal(a.mat);
    });
  });
});

describe('Mat4', () => {
  before(() => {
    const mat4 = new Mat4();
    it('is a Matrix3 instance', () => {
      expect(mat4).to.be.a('Matrix3');
    });
    it('the mat will be [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      expect(mat4.mat).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });
  describe('setI()', () => {
    const mat4 = new Mat4().setI();
    it('the mat will be [1, 0, 0, 0, 1, 0, 0, 0, 1]', () => {
      expect(mat4.mat).to.deep.equal([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });
  });
  describe('setRotate()', () => {
    it('the mat will rotate 30 degree with [0, 0, 1], ', () => {
      const mat4 = new Mat4().setRotate(30);
      const cos = Math.cos(30 * Math.PI / 180);
      const sin = Math.sin(30 * Math.PI / 180);
      expect(mat4.mat).to.deep.equal([cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });
    it('the mat will rotate 45 degree with [1, 1, 1]', () => {
      const mat4 = new Mat4().setRotate(45, [1, 1, 1]);
      const cos = Math.cos(45 * Math.PI / 180);
      const sin = Math.sin(45 * Math.PI / 180);
      const cos1 = 1-cos;
      const sin1 = 1-sin;
      const r = Math.sqrt(3)/3;
      expect(mat4.mat).to.deep.equal([cos + cos1*r*r, cos1*r*r-sin*r, cos1*r*r+sin*r, 0, cos1*r*r+sin*r, cos+cos1*r*r, cos1*r*r-sin*r, 0, cos1*r*r-sin*r, cos1*r*r+sin*r, cos + cos1*r*r, 0, 0, 0, 0, 1]);
    });
  });
  describe('setScale()', () => {
    it('the mat will scale xscale,yscale', () => {
      const xscale = 3, yscale = 4.5, zscale= 5.5;
      const mat4 = new Mat4().setScale(xscale, yscale, zscale);
      expect(mat4.mat).to.deep.equal([xscale,0, 0, 0, 0, yscale, 0, 0, 0, 0, zscale,0, 0, 0, 0, 1]);
    });
  });
  describe('setTranslate()', () => {
    it('the mat will move xm, ym', () => {
      const xm = 2, ym = 3.5, zm=8.8;
      const mat4 = new Mat4().setTranslate(xm, ym, zm);
      expect(mat4.mat).to.deep.equal([1 ,0, 0, xm, 0, 1, 0, ym, 0, 0, 1, zm, 0, 0, 0, 1]);
    });
  });
  describe('handleMultiplyBy()', () => {
    it('the mat will check I * A = A', () => {
      const i = new Mat4().setI();
      const a = new Mat4().setScale(4, 11);
      const r = a.multiply(i);
      expect(r.mat).to.deep.equal(a.mat);
    });
    it('the mat will check A * I = A', () => {
      const i = new Mat4().setI();
      const a = new Mat4().setScale(4, 11);
      const r = a.multiplyBy(i);
      expect(r.mat).to.deep.equal(a.mat);
    });
    it('the mat will check A * 0 = 0', () => {
      const i = new Mat4([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      const a = 0;
      const r = i.multiplyBy(a);
      expect(r.mat).to.deep.equal(new Array(16).fill(0));
    });
    it('the mat will check A * 5 = 5 * A = 5A', () => {
      const s0 = new Array(9).fill(0).map((e, i) => i + 1);
      const a = 5;
      const s = s0.map(ele => ele * a);
      const i = new Mat4(s0);
      const r = i.multiplyBy(a);
      expect(r.mat).to.deep.equal(s);
      const r2 = i.multiply(a);
      expect(r2.mat).to.deep.equal(s);
      expect(r2.mat).to.deep.equal(r.mat);
    });
    it('check A * B != B * A', () => {
      const s0 = new Array(16).fill(0).map((e, i) => i + 1);
      const s1 = [...s0].reverse();
      const A = new Mat4(s0);
      const B = new Mat4(s1);
      const ab = A.multiplyBy(B);
      const ba = A.multiply(B);
      expect(ab.mat).to.deep.not.equal(ba.mat);
    });
    describe('check A * B', () => {
      const s0 = new Array(16).fill(0).map((e) => (Math.random() * 100));
      const s1 = new Array(16).fill(0).map((e) => (Math.random() * 100));
      const A = new Mat4(s0);
      const B = new Mat4(s1);
      const ab = A.multiplyBy(B);
      const step = 4;
      ab.mat.forEach((ele,idx) => {
        const row = Math.floor(idx / step);
        const col = idx % step;
        it(`ab[${row +1}, ${col+1}] = sum(A[${row}, i] * B[i, ${col}], i in 0-${step})`, () => {
          let sum = 0;
          for (let idx = 0; idx < step; ++idx) {
            sum += A.getElement(row, idx) * B.getElement(idx, col);
          }
          expect(ele).to.equal(sum);
        });
      });
    });
    describe('check A*B perform', () => {
      it('perform is', () => {
        let s0 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        let s1 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        let A = new Mat4(s0);
        let B = new Mat4(s1);
        const mm = 'multiplyBy';
        console.time(mm);
        let ab = A.multiplyBy(B);
        console.timeEnd(mm);

        s0 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        s1 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        const step = 4;
        const smm = 'multipyBySum';
        console.time(smm);
        let sab = s0.map((ele, idx) => {
          const row = Math.floor(idx / step);
          const col = idx % step;
          let sum = 0;
          for (let idx = 0; idx < step; ++idx) {
            sum += s0[row * step + idx] * s1[idx * step + col];
          }
          return sum;
        });
        let abs = new Mat4(sab);
        console.timeEnd(smm);

        s0 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        s1 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        A = new Mat4(s0);
        B = new Mat4(s1);

        console.time(mm);
        ab = A.multiplyBy(B);
        console.timeEnd(mm);

        s0 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        s1 = new Array(16).fill(0).map((e) => (Math.random() * 100));
        console.time(smm);
        sab = s0.map((ele, idx) => {
          const row = Math.floor(idx / step);
          const col = idx % step;
          let sum = 0;
          for (let idx = 0; idx < step; ++idx) {
            sum += s0[row * step + idx] * s1[idx * step + col];
          }
          return sum;
        });
        abs = new Mat4(sab);
        console.timeEnd(smm);
      });
    });
  });  
  describe('thenRotate', () => {
    it('check A.thenRotate == setRotate.multiplyBy(A)', () => {
      const mat4 = new Array(16).fill(0).map(ele => Math.floor(Math.random() * 100));
      const A = new Mat4(mat4);
      const deg = Math.random()*360;
      const axis = new Array(3).fill(0).map(ele => (Math.random() * 10 + 1));
      const thenRotate = A.thenRotate(deg, axis);
      const matrix = new Mat4().setRotate(deg, axis).multiplyBy(A);
      expect(thenRotate.mat).to.deep.equal(matrix.mat);
    });
  });
  describe('thenScale', () => {
    it('check A.thenScale == setScale.multiplyBy(A)', () => {
      const mat4 = new Array(16).fill(0).map(ele => Math.floor(Math.random() * 100));
      const A = new Mat4(mat4);
      const [xs, ys, zs] = [Math.random()*100, Math.random()*100, Math.random()*100];
      const thenScale = A.thenScale(xs, ys, zs);
      const matrix = new Mat4().setScale(xs, ys, zs).multiplyBy(A);
      expect(thenScale.mat).to.deep.equal(matrix.mat);
    });
  });
  describe('thenTranslate', () => {
    it('check A.thenTranslate == setTranslate.multiplyBy(A)', () => {
      const mat3 = new Array(16).fill(0).map(ele => Math.floor(Math.random() * 100));
      const A = new Mat4(mat3);
      const [xm, ym, zm] = [Math.random()*100, Math.random()*100, Math.random() * 100];
      const thenTranslate = A.thenTranslate(xm, ym, zm);
      const matrix = new Mat4().setTranslate(xm, ym, zm).multiplyBy(A);
      expect(thenTranslate.mat).to.deep.equal(matrix.mat);
    });
  });
});

