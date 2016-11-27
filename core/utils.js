
/**
 * Flattens a nested array.
 *
 * @param {*[]} arr Array to be flattened
 * @return {*[]} Flattened array
 */
function flatten(arr) {
  if (!Array.isArray(arr[0])) {
    return arr;
  }
  return [].concat.apply([], arr.map(flatten));
}

/**
 * Takes the product of the numbers in `arr`.
 *
 * @param {number[]} arr List of numbers to multiply together
 * @return {number} The product
 */
function product(arr) {
  var prod, i;

  for (prod = 1, i = 0; i < arr.length; i += 1) {
    prod *= arr[i];
  }
  return prod;
}

/**
 * Gets the stride of a tensor given its shape, or the lengths along each
 * dimension.
 *
 *    stride[i] = stride[i+1] * dims[i]
 *    stride[-1] = 1
 *
 * @param {number[]} dims Shape of the tensor or n-d array
 * @return {number[]} How many elements each dimension encapsulates
 */
function stride(dims) {
  var strd = [1]
    , i;

  if (!Array.isArray(dims) && dims.length === undefined) {
    return [];
  }

  for (i = dims.length - 1; i > 0; i -= 1) {
    strd.unshift(dims[i] * strd[0]);
  }
  return strd;
}

/**
 * Gets the shape of a nested array. Uses the first index of each subarray to
 * determine the length in that dimension.
 *
 * @param {*[]} arr Array to take the shape of
 * @return {*[]} Length of the nested array in each dimension
 */
function shapeOf(arr) {
  var dims = []
    , subarr = arr;

  while (Array.isArray(subarr) || subarr.length !== undefined) {
    dims.push(subarr.length);
    subarr = subarr[0];
  }
  return dims;
}

module.exports.stride = stride;
module.exports.flatten = flatten;
module.exports.product = product;
module.exports.shapeOf = shapeOf;
