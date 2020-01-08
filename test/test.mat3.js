const { Mat3, Mat3Dev } = require('../index.js');
const chai = require('chai');
const { assert, expect, should } = chai;

describe('Mat3', () => {
  const mat3 = new Mat3();
  before(() => {
    it('is a Matrix3 instance', () => {
      expect(mat3).to.be.a('Matrix3');
    });
    it('the mat will be [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      expect(mat3.mat).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });
  describe('setI()', () => {
    mat3.setI();
    it('the mat will be [1, 0, 0, 0, 1, 0, 0, 0, 1]', () => {
      expect(mat3.mat).to.deep.equal([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
  });
});

describe('Mat3Dev', () => {
  const mat3 = new Mat3Dev();
  before(() => {
    it('is a Matrix3 instance', () => {
      expect(mat3).to.be.a('Matrix3');
    });
    it('the mat will be [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      expect(mat3.mat).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });
  describe('setUsage()', () => {
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
  describe('setI()', () => {
    mat3.setI();
    it('the mat will be [1, 0, 0, 0, 1, 0, 0, 0, 1]', () => {
      expect(mat3.mat).to.deep.equal([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
    it('set usage to be 1', () => {
      expect(mat3.usage).to.equal(1);
    });
  });
});
