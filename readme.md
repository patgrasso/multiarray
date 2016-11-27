# multiarray :bullettrain_side:
Very fast multidimensional arrays for javascript.

## Purpose
The idea of multiarray is to bring matrix-like datastructures found in libraries like
numpy and the GNU Scientific Library to javascript. Trivial implementations of this
can be simply achieved by using nested arrays, but this is extremely slow.

multiarray performs just as quickly as [ndarray](https://github.com/scijs/ndarray),
but is much more flexible and extensible.

```javascript
var m = new MultiArray([[1, 2], [3, 4]]);

// m
// 2dArray [[1, 2],
//          [3, 4]]

m.get(0, 1)
// 2
m.set(0, 1, 9)
// 2dArray [[1, 9],
//          [3, 4]]
```

## Methods
Methods can be attached to the multiarray prototype like so...

```javascript
const MultiArray = require('multiarray');

// Get the dimensionality of a matrix
function dimsFactory(props) {
  return function () {
    return props.d;
  }
}

MultiArray.method('dims', dimsFactory);

new MultiArray([[[1, 2],
                 [3, 4]],
                [[5, 6],
                 [7, 8]]]).dims();
// 3
```

The function supplied to `method(name, factory)` should be a factory that takes
in an object that looks like this:
```jsx
// props =
{
  d   : < # of dimensions >
  type: < type of the underlying array (Array, Uint32Array, ...)
}
```
And returns a function that will serve as the method. This allows you to tailor a
method to suit matrices of different types and dimensionalities. This is how
`get()` and `set()` are defined for the multiarray. The actual `get()` function
varies depending on the dimensionality of a matrix in order to improve indexing
speed.

## Inspiration
This project is heavily inspired by [ndarray](https://github.com/scijs/ndarray).
While this may seem redundant (why not just fork?), the source code for multiarray
is drastically different. In the future, I might try to merge this into ndarray,
but for now I'll just continue to build it out here and make it as compliant as
possible with ndarray without sacrificing (and perhaps improving) performance.

## License
MIT
