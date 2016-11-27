
const utils = require('./utils');

/**
 * Cache for created constructors. Once a constructor is created for some type
 * and dimension, it gets stored in case another matrix of the same type is
 * needed again.
 */
const cache = {
  'Array'             : [],
  'Int8Array'         : [],
  'Uint8Array'        : [],
  'Uint8ClampedArray' : [],
  'Int16Array'        : [],
  'Uint16Array'       : [],
  'Int32Array'        : [],
  'Uint32Array'       : [],
  'Float32Array'      : [],
  'Float64Array'      : []
};

/**
 * Removes all constructors from the cache.
 */
Object.defineProperty(cache, 'clear', {
  value: () => Object.keys(multiarray.cache).forEach(
    (type) => multiarray.cache[type] = []
  ),
  enumerable: false
});

/**
 * Methods, or functions that get attached to the array prototype.
 */
const methods = {};

/**
 * Decorators that get applied to the array after it has been created. Proxies
 * make good decorators.
 */
const decorators = [];


/**
 * Creates an array constructor for a specific dimension.
 *
 * @param {number} d The dimensionality of the array/matrix constructor
 * @return {Function} Constructor for a d dimensional array
 */
function createConstructor(d, type='Array') {

  // The constructor
  function Ray(array, shape) {
    this.shape = shape.slice();
    this.stride = utils.stride(shape);
    this.data = utils.flatten(array);
  }

  // Assign methods to the prototype
  Object.keys(methods).forEach((name) => {
    Ray.prototype[name] = methods[name]({ d: d, type: type });
  });

  // Rename the constructor to reflect the nature of it (dimension & type)
  Object.defineProperty(Ray, 'name', { value: d + 'd' + type });

  return Ray;

}

/**
 * Defines a method to be attached to the prototype of each constructor,
 * including existing ones.
 *
 * @param {string}    name    Name of the new method that will sit on the
 *                            prototype
 * @param {Function}  factory Setup function that accepts a property object that
 *                            looks like `{ d: [dimension], type: [type] }` and
 *                            returns the method that will go on the prototype.
 *                            This being a factory allows for specialized
 *                            functions for specific types and dimensions of
 *                            matrices
 * @return {Function} The factory
 */
function defineMethod(name, factory) {
  Object.keys(cache).forEach((type) => {
    cache[type].forEach((constructor, dim) => {
      constructor.prototype[name] = factory({
        d: dim,
        type: type
      });
    });
  });
  return methods[name] = factory;
}

/**
 * Creates a new n-d array and returns it.
 */
function multiarray(array, shape, dtype) {
  var type = array.constructor.name;

  shape = shape || utils.shapeOf(array);
  array = utils.flatten(array);

  if (cache[type] === undefined) {
    throw new TypeError('Expected an iterable type');
  } else if (cache[type][shape.length] === undefined) {
    cache[type][shape.length] = createConstructor(shape.length, type);
  }

  var ray = new cache[type][shape.length](array, shape);

  if (this instanceof arguments.callee) {
    Object.defineProperty(this.constructor, 'name', {
      value: ray.constructor.name
    });
  }

  return decorators.reduce((prev, decorate) => decorate(ray), ray);
}

multiarray.cache = cache;
multiarray.method = defineMethod;
multiarray.use = (d) => decorators.push(d);

module.exports = multiarray;
