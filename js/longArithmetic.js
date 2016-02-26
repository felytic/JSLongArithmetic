/*jshint esversion: 6 */

const pattern = /^([+-])?0*(\d*?)(0*)(\.(0*)(\d*?)0*)?(e([+-]?\d+))?$/;
const base = 1; //10^7
const max = Math.pow(10, base);

class LongNumber {

  constructor(number, begin, end, sign, digitsObj) {

    if ((typeof(begin) == 'number') && (typeof(end) == 'number') &&
      (typeof(sign) == 'number') && (typeof(digitsObj) == 'object')) {
      this.begin = begin;
      this.end = end;
      this.sign = sign;
      this.digits = digitsObj;
      return;
    }

    if (!number) number = 0;
    number = String(number);
    var match = pattern.exec(number);
    if (!match) throw new TypeError('Wrong number format');

    const signChar = match[1];
    const mainDigits = match[2];
    const zeroesBeforeDot = match[3];
    const zeroesAfterDot = match[5];
    const digitsAfterDot = match[6];
    const e = match[8];

    this.end = toNum(e);
    this.begin = 0;
    this.sign = signChar == '-' ? -1 : 1;
    var digits = '';

    if (digitsAfterDot) {
      this.end -= digitsAfterDot.length + zeroesAfterDot.length;
      if (mainDigits) {
        digits += mainDigits + zeroesBeforeDot + zeroesAfterDot;
      }
      digits += digitsAfterDot;
    } else {
      this.end += zeroesBeforeDot.length;
      digits = mainDigits;
      if (!mainDigits) {
        this.sign = 0;
        this.end = 0;
        this.digits = {};
        return;
      }
    }

    var shift = Math.abs(this.end % base);
    if (this.end < 0 && shift !== 0) {
      shift = base - shift;
    }

    this.end -= shift;
    var endZeroes = '';

    for (let i = 0; i < shift; i++) {
      endZeroes += '0';
    }

    digits += endZeroes;
    this.digits = {};
    this.begin = Math.floor((this.end + digits.length - 1) / base);
    this.digits[this.begin] = +digits.slice(0, digits.length % base);

    for (let i = digits.length - base; i >= 0; i -= base) {
      this.digits[Math.floor((digits.length + this.end - i) / base) - 1] = +digits.slice(i, i + base);
    }

    this.end /= base;
  }

  //--------------------------- Methods ---------------------------------------

  toString() {
    if (this.isZero()) return '0';

    var str = this.sign == -1 ? '-' : '';
    var digit;
    var begin = this.begin > 0 ? this.begin : 0;
    var end = this.end < 0 ? this.end : 0;

    for (let i = begin; i >= end; i--) {
      if (i == -1) {
        str += '.';
      }
      digit = this.digits[i] ? '' + this.digits[i] : '0';
      if ((i < this.begin) || (i < 0)) {
        while (digit.length < base) digit = '0' + digit;
      }
      str += digit;
    }

    var lastDigit = str.length - 1;
    if (this.end < 0) {
      while (str[lastDigit] == "0") lastDigit--;
    }

    return str.substring(0, lastDigit + 1);
  }

  invert() {
    var result = this.clone();
    result.sign = -this.sign;
    return result;
  }

  clone() {
    if (this.isZero()) return new LongNumber();

    var result = new LongNumber(null, this.begin, this.end, this.sign, {});

    for (var i in this.digits) {
      result.digits[i] = this.digits[i];
    }

    return result;
  }

  compare(n){
    return LongNumber.compare(this, n);
  }

  isZero() {
    return this.sign === 0;
  }

  isOne() {
    return (JSON.stringify(this.digits) === JSON.stringify({0: 1}) &&
      this.sign == 1);
  }

  isMinusOne() {
    return (JSON.stringify(this.digits) === JSON.stringify({0: 1}) &&
      this.sign == -1);
  }

  isPositive() {
    return this.sign > 0;
  }

  isNegative() {
    return this.sign < 0;
  }

  add(b) {
    return LongNumber.add(this, b);
  }

  subtract(b) {
    return LongNumber.subtract(this, b);
  }

  multiply(b) {
    return LongNumber.multiply(this, b);
  }

  divide(b) {
    return LongNumber.divide(this,b);
  }

  _removeZeroes() {
    while (this.digits[this.end] === 0) {
      delete this.digits[this.end];
      this.end++;
    }

    while (this.digits[this.begin] === 0) {
      delete this.digits[this.begin];
      this.begin--;
    }

    return this;
  }

  //--------------------- Static Methods --------------------------------------

  static compare(a, b) {
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    if (a.isZero()) return -b.sign;

    if (a.isPositive() && !b.isPositive()) return 1;
    if (a.isNegative() && !b.isNegative()) return -1;

    //If numbers are both negative a.sign will reverse the result
    return LongNumber.absCompare(a, b) * a.sign;
  }

  //Comparing by absolute value
  static absCompare(a, b) {
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    if (a.isZero() && b.isZero()) return 0;
    if (a.isZero()) return -1;
    if (b.isZero()) return 1;

    if (a.begin > b.begin) return 1;
    if (a.begin < b.begin) return -1;

    for (var i = a.begin; i >= a.end; i--) {
      var digitA = toNum(a.digits[i]);
      var digitB = toNum(b.digits[i]);

      if (digitA > digitB) return 1;
      if (digitA < digitB) return -1;
    }

    if (b.end < a.end) return -1;

    return 0;
  }

  static toLongNumber(x) {
    if (!(x instanceof LongNumber)) {
      return new LongNumber(x);
    }

    return x;
  }

  static add(a, b) {
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    if (a.isZero()) return b.clone();
    if (b.isZero()) return a.clone();
    if (a.sign != b.sign) return LongNumber.subtract(a, b.invert());

    var begin = Math.max(a.begin, b.begin) + 1; //Extra digit before
    var end = Math.min(a.end, b.end);
    var result = new LongNumber(null, begin, end, a.sign, {});
    result.digits[begin] = 0; //for increasing while addition, undef += n = NaN

    for (let i = end; i <= begin; i++) {
      result.digits[i] = toNum(a.digits[i]) + toNum(b.digits[i]);

      if (result.digits[i - 1] >= max) {
        result.digits[i] += 1;
        result.digits[i - 1] -= max;
      }
    }

    return result._removeZeroes();
  }

  static subtract(a, b) {
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    if (a.sign === 0) return b.invert();
    if (b.sign === 0) return a.clone();
    if (a.sign != b.sign) return LongNumber.add(a, b.invert());

    var aCompareB = LongNumber.absCompare(a, b);

    if (aCompareB === 0) return new LongNumber();

    var begin = Math.max(a.begin, b.begin);
    var end = Math.min(a.end, b.end);
    var result = new LongNumber(null, begin, end, a.sign, {});

    //for subtracting smaller number from bigger
    if (aCompareB < 0) {
      result.sign = -result.sign;
      var c = a;
      a = b;
      b = c;
    }

    for (let i = end; i <= begin; i++) {
      result.digits[i] = toNum(a.digits[i]) - toNum(b.digits[i]);

      if (result.digits[i - 1] < 0) {
        result.digits[i - 1] += max;
        result.digits[i] -= 1;
      }
    }

    return result._removeZeroes();
  }

  static multiply(a, b) {
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    if (a.isZero() || b.isZero()) {
      return new LongNumber();
    }

    if (a.isOne()) return b.clone();
    if (a.isMinusOne()) return b.invert();

    if (b.isOne()) return a.clone();
    if (b.isMinusOne()) return a.invert();

    var begin = Math.max(a.begin, b.begin) + 1;
    var end = Math.min(a.end, b.end);
    var result = new LongNumber();

    for (let i = end; i <= begin; i++) {
      var tempResult = new LongNumber(null, begin + i, end * 2, 1, {});

      for (let j = end; j <= begin; j++) {
        tempResult.digits[i + j] = toNum(a.digits[i]) * toNum(b.digits[j]);

        if (tempResult.digits[i + j - 1] > max) {
          tempResult.digits[i + j] +=
            Math.floor(tempResult.digits[i + j - 1] / max);
          tempResult.digits[i + j - 1] %= max;
        }
      }

      result = result.add(tempResult);
    }

    return result._removeZeroes();
  }

  static divide(a, b, precision = 100){
    precision /= base;
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    if (b.isZero()) throw new Error('Division by zero');
    if (b.isOne()) return a.clone();
    if (b.isMinusOne()) return a.clone().invert();
    if (a.isZero()) return a.clone();

    var dividerLength = b.begin - b.end + 1;
    var remeaning = new LongNumber(null, b.begin, b.end, b.sign, {});
    var fraction = new LongNumber();
    var shift = a.begin - b.begin;
    var lastDigitPos = a.begin - dividerLength;

    for (let i = 0; i < dividerLength; i++){
      remeaning.digits[b.begin - i] = toNum(a.digits[a.begin - i]);
    }

    do {
      var divisionResult = LongNumber._simpleDivide(remeaning, b);
      var tempFraction = divisionResult.fraction;
      var newDigits = {};

      for (let i = tempFraction.begin; i <= tempFraction.end; i++){
        newDigits[i + shift] = toNum(tempFraction.digits[i]);
      }

      tempFraction.digits = newDigits;
      tempFraction.begin += shift;
      tempFraction.end += shift;

      fraction = fraction.add(tempFraction);

      do {
        remeaning = divisionResult.remeaning;
        remeaning = remeaning.multiply(max).add(toNum(a.digits[lastDigitPos]));
        shift--;
        lastDigitPos--;
      } while (remeaning.compare(b) == -1 &&
          (!remeaning.isZero() || lastDigitPos > a.end));

    } while (!remeaning.isZero() && (lastDigitPos > -precision));

    return fraction;
  }

  //private method, only for two posotive numbers
  static _simpleDivide(a, b){
    a = LongNumber.toLongNumber(a);
    b = LongNumber.toLongNumber(b);

    var result = new LongNumber();
    var dividend = a.subtract(b);

    while (!dividend.isNegative()){
      result = result.add(1);
      dividend =  dividend.subtract(b);
    }

    return {fraction: result, remeaning: dividend.add(b)};
  }
}


function toNum(n) {
  return n ? +n : 0;
}
