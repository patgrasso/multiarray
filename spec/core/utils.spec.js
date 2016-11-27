/*global describe, it, expect*/

const utils = require('../../core/utils');

describe('utils', () => {

  describe('flatten()', () => {

    it('should flatten a nested array', () => {
      expect(utils.flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
      expect(utils.flatten([[[1], 2], 3])).toEqual([1, 2, 3]);
    });

    it('should return the original array if it is not nested', () => {
      var arr = [1, 2, 3]
        , uintarr = new Uint8Array([1, 2, 3]);
      expect(utils.flatten(arr)).toBe(arr);
      expect(utils.flatten(uintarr)).toBe(uintarr);
    });

    it('should return the original item if it is not an array', () => {
      var item = 3;
      expect(utils.flatten(item)).toBe(item);
    });

  });

  describe('product()', () => {

    it('should return the product of the numbers in the list', () => {
      expect(utils.product([1, 2, 3])).toBe(6);
      expect(utils.product([0, 1, 2])).toBe(0);
      expect(utils.product([2, 3, 4])).toBe(24);
    });

    it('should take the product of a single element', () => {
      expect(utils.product([4])).toBe(4);
    });

  });

  describe('shapeOf()', () => {

    it('should return a list of sizes for each dimension of a nested array', () => {
      expect(utils.shapeOf([[1, 2], [3, 4]])).toEqual([2, 2]);
      expect(utils.shapeOf([[1, 2, 3], [1, 2, 3]])).toEqual([2, 3]);
    });

    it('should return a list of a single size for a flat array', () => {
      expect(utils.shapeOf([1, 1, 2, 2, 1, 2, 1])).toEqual([7]);
    });

    it('should return [] for a non-array', () => {
      expect(utils.shapeOf(1)).toEqual([]);
    });

    it('should work for typed arrays', () => {
      expect(utils.shapeOf(Float64Array.from([1, 2, 3]))).toEqual([3]);
    });

  });

  describe('stride()', () => {

    it('should get the stride given a matrix shape', () => {
      expect(utils.stride([2, 2, 2])).toEqual([4, 2, 1]);
      expect(utils.stride([3, 2, 1])).toEqual([2, 1, 1]);
      expect(utils.stride([3, 3, 2, 3])).toEqual([18, 6, 3, 1]);
    });

    it('should return [1] 1-d arrays', () => {
      expect(utils.stride([4])).toEqual([1]);
    });

    it('should return [] for non-arrays', () => {
      expect(utils.stride(4)).toEqual([]);
    });

  });

});
