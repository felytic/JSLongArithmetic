# JS Long Arithmetic
This lib provides arithmetical operation with numbers of different length and
precision. It was written on **Ecmascript 6**. You can watch tests and try
it [here](http://felytic.github.io/JSLongArithmetic/)
(your browser has to support [ES6](#es6-in-browsers).


## Usage

Just add [js/longArithmetic.js](https://raw.githubusercontent.com/Felytic/JSLongArithmetic/gh-pages/js/longArithmetic.js)
to your project.

#### ES6 in browsers

**Chrome** enable [chrome://flags/#enable-javascript-harmony](chrome://flags/#enable-javascript-harmony)

**Firefox** avaliable only in [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/)

### Constructor

`new LongNumber(number)` creates instance of a class. With no arguments creates
number 0. Argument can be both String or Number. You can add exponent too
`new LongNumber('-4.35e-30')`.

### Static methods

`compare(a, b)` compares two long numbers. Returns 1 ==> a > b,
0 ==> a == b, -1 ==> a < b.

`absCompare(a, b)` works as `compare()`. Comparing by absolute value.

`toLongNumber(n)` Type conversion.

Methods below return new instance of LongNumber after doind operation

`add(a, b)`

`subtract(a, b)`

`multiply(a, b)`

`divide(a, b)`

### Methods

`toString` returns LongNumber as a string.

`invert()` returns this number multiplyed by -1.

`clone()` returns copy of current item.

Methods below work as `LongNumber.method(this, n)`

`add(n)`

`subtract(n)`

`multiply(n)`

`divide(n)`

#### And some boolean methods:

`isZero()` `isOne()` `isMinusOne()` `isPositive()`
`isNegative()`

### Tips

All methods can get both Number and LongNumber as arguments:

`a.add(new LongNumber(32))` is equal to `a.add(32)`

You can create chains with methods:

`a.add(123).multiply(b).invert()` for `-((a + 123) * b)`
