/*global describe, it, expect, beforeAll*/

const MultiArray = require('../../core/multiarray');

describe('multiarray', () => {

  describe('constructor()', () => {

    it('should make a new 1dArray from a 1-d array using `new`', () => {
      var m = new MultiArray([1, 2, 3, 4]);
      expect(m.data).toEqual([1, 2, 3, 4]);
      expect(m.shape).toEqual([4]);
      expect(m.stride).toEqual([1]);
    });

    it('should make a new 2dArray from a 1-d array using `new`', () => {
      var m = new MultiArray([1, 2, 3, 4], [2, 2]);
      expect(m.data).toEqual([1, 2, 3, 4]);
      expect(m.shape).toEqual([2, 2]);
      expect(m.stride).toEqual([2, 1]);
    });

    it('should make a new 2dArray from a 2-d array using `new`', () => {
      var m = new MultiArray([[1, 2], [3, 4]]);
      expect(m.data).toEqual([1, 2, 3, 4]);
      expect(m.shape).toEqual([2, 2]);
      expect(m.stride).toEqual([2, 1]);
    });

    it('has a name which reflects the dimensionality of the matrix', () => {
      var m = new MultiArray([1, 2, 3, 4], [2, 2]);
      expect(m.constructor.name).toBe('2dArray');
    });

    it('should make a new NdArray from a n-d array without `new`', () => {
      var m = MultiArray([[1, 2], [1, 1], [2, 5]]);
      expect(m.data).toEqual([1, 2, 1, 1, 2, 5]);
      expect(m.shape).toEqual([3, 2]);
      expect(m.stride).toEqual([2, 1]);
      expect(m.constructor.name).toBe('2dArray');
    });

  });

  describe('method()', () => {

    beforeAll(() => {
      MultiArray.cache.clear();
    });

    it('defines a method on each new MultiArray using a factory', () => {
      MultiArray.method('testA', () => () => 'foobar');
      expect(MultiArray([1, 2])['testA']).toBeDefined();
      expect(MultiArray([1, 2]).testA()).toBe('foobar');
    });

    it('binds the method to the new instance (puts it on the prototype)', () => {
      MultiArray.method('testB', () => function () { return this; });
      var m = MultiArray([[1, 2], [3, 4]]);
      expect(m.testB()).toBe(m);
    });

    it('defines the method on all existing prototypes in the cache', () => {
      var m = MultiArray([1, 2, 3]);
      MultiArray.method('testC', () => () => 42);
      expect(m['testC']).toBeDefined();
      expect(m.testC()).toBe(42);
    });

  });

  describe('use()', () => {

    it('adds a function to a list of decorators that are applied after construction', () => {
      MultiArray.use((m) => (m.myValue = 27) && m);
      expect(MultiArray([1]).myValue).toBe(27);
      expect(MultiArray([[7, 10]]).__proto__.myValue).toBeUndefined();
    });

  });

});
