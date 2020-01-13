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
});

