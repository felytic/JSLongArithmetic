# JS Long Arithmetic
This lib provides arithmetical operation with numbers of different length and
precision. It was written on **Ecmascript 6**. You can watch tests and try 
it [here](http://felytic.github.io/JSLongArithmetic/).

## Usage

### Constructor

`new LongNumber(number)` creates instance of a class. With no arguments creates 
number 0. Argument can be both String or Number. You can add exponent too
`new LongNumber('-4.35e-30')`.

### Static methods

`compare(a, b)` compares two long numbers. Returns 1 ==> a > b, 
0 ==> a == b, -1 ==> a < b.

`absCompare(a, b)` works as `compare()`. Comparing by absolute value.

`toLongNumber(n)` Type conversion.

`add(a, b)` Adds a to b, returns new instance of LongNumber.

`subtract(a, b)` Subtracts b from a, returns new instance of LongNumber.

### Methods

`toString` returns LongNumber as a string.

`invert()` returns this number multiplyed by -1.

`clone()` returns copy of current item.

`add(n)` works as `LongNumber.add(this, n)`

`subtract(n)` works as `LongNumber.subtract(this, n)`

#### And some boolean methods: 

`isZero()` `isOne()` `isMinusOne()` `isPositive()`
`isNegative()` `isNotNegative()` `isNotPositive()`
