/*jshint esversion: 6 */
//-------- Long Number class ----------------
var pattern = /^([+-])?0*(\d*?)(0*)(\.(0*)(\d*?)0*)?(e([+-]?\d+))?$/;
const base = 2; //10^16
class LongNumber {
  constructor(number = 0) {
    number = String(number);
    //Check for number pattern ex: -123.456e+20
    var match = pattern.exec(number);
    if (!match) throw new TypeError('Wrong number format');

    const sign = match[1];
    const mainDigits = match[2];
    const zeroesBeforeDot = match[3];
    const zeroesAfterDot = match[5];
    const digitsAfterDot = match[6];
    const e = match[8];

    this.end = e ? +e : 0;
    this.sign = sign == '-' ? -1 : 1;
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
      var shift = Math.abs((base + this.end) % base);    
      this.end -= shift;
      var endZeroes = '';
      for (let i = 0; i < shift; i++) endZeroes += '0';
      digits += endZeroes;
      this.digits = {};
      this.begin = Math.floor((this.end + digits.length) / base);
      this.digits[this.begin] = +digits.slice(0, digits.length % base);
      for (let i = digits.length - base; i >= 0; i -= base){
        this.digits[Math.floor((digits.length + this.end - i) / base) - 1] = +digits.slice(i, i + base);        
      }
      this.end /= base;

  }
  //------ Methods --------------------------------------
  toString() {
    if (this.sign === 0) return '0';
    var str = this.sign == -1 ? '-' : '';
    var digit;
    for (let i = this.begin > 0 ? this.begin : 0; i >= this.end; i--){
      if (i == -1) {
        str += '.'
      }
      digit = this.digits[i] ? '' + this.digits[i] : '0';
      while (digit.length < base && i < this.begin) digit = '0' + digit;
      str += digit;
    }
    return str;
  }

  //-----Incrementing current number by another log number ----
  inc(longN = 1) {
    longN = LongNumber.toLongNumber(longN);
    if (longN.sign === 0) return;
    if (longN.sign != this.sign) {
      if (this.sign === 0){
        this.digits = longN.digits;
        this.sign = longN.sign;
        return;
      }
      longN.invert();
      this.dec(longN);
      longN.invert();
      return;
    }

    var nums = longN.digits;
    var sum = this.digits;

    //         [..this.digits..]   _\   [.......this.digits..]
    //    [..longN.digits..]        /   [..longN.digits..]
    var addedAfter = 0;
    if (longN.end < this.end) {
      addedAfter = this.end - longN.end;
      Array.prototype.unshift.apply(sum, new Array(addedAfter));
      this.end = longN.end;
      for (let i = 0; i < addedAfter; i++) {
        sum[i] = nums[i] ? nums[i] : 0;
      }
    }

    //[..this.digits..]           _\   [..this.digits..........]
    //       [..longN.digits..]     /          [..longN.digits..]
    var addedBefore = 0;
    if (longN.begin > this.begin) {
      addedBefore = longN.begin - this.begin;
      Array.prototype.push.apply(sum, new Array(addedBefore));
      for (let i = 0; i < addedBefore; i++) {
        sum[sum.length - i - 1] = nums[nums.length - i - 1] ? nums[nums.length - i - 1] : 0;
      }
    }

    //adding two arrays
    var from =  Math.max(this.end + addedAfter, longN.end + addedAfter);
    var to = Math.min(this.begin - addedBefore, longN.begin);
    for (var i = from; i <= to; i++) {
      sum[i - this.end] += nums[i - longN.end];
    }

    const last =  sum.length - 1;
    for (let i = from - this.end; i < last; i++){
      if (sum[i] > 9){
        sum[i] -= 10;
        sum[i + 1] += 1;
      }
    }

    if (sum[last] > 9){
      sum[last] -= 10;
      sum.push(1);
    }

    this.sliceEndZeroes();
  }


  dec(longN = 1) {
    longN = LongNumber.toLongNumber(longN);
    if (longN.sign === 0) return;
    if (longN.sign != this.sign) {
      if (this.sign === 0){
        this.digits = longN.digits;
        this.sign = -longN.sign;
        return;
      }
      longN.invert();
      this.inc(longN);
      longN.invert();
      return;
    }
  }

  sliceEndZeroes(){  //[0,0,0,0,0,..this.digits..] => [..this.digits..]
    if (this.sign === 0) return;
    for (var i = 0; this.digits[i] === 0; i++);
    this.end += i;
    if (i) this.digits.splice(0, i);
  }

  //----------Static Methods ---------------------
  static longCompare(longA, longB) {
    longA = LongNumber.toLongNumber(longA);
    longB = LongNumber.toLongNumber(longB);
    if (longA.sign > 0) {
      if (longB.sign <= 0) return 1;
      return longAbsCompare(longA, longB);
    }
    if (longA.sign < 0) {
      if (longB.sign >= 0) return -1;
      return longAbsCompare(longB, longA);
    }
    if (longB.sign > 0) return -1;
    if (longB.sign === 0) return 0;
    if (longB.sign < 0) return 1;
  }

  static longAbsCompare(longA, longB) {
    longA = LongNumber.toLongNumber(longA);
    longB = LongNumber.toLongNumber(longB);
    if (longA.begin > longB.begin) return 1;
    if (longA.begin < longB.begin) return -1;
    for (var i = longA.begin; i >= longA.end; i--) {
      var a = longA.numbers[i] ? longA.numbers[i] : 0;
      var b = longB.numbers[i] ? longB.numbers[i] : 0;
      if (a > b) return 1;
      if (a < b) return -1;
    }
    if (longB.end < longA.end) return -1;
    else return 0;
  }

  static toLongNumber(x){
    if (!(x instanceof LongNumber)) return new LongNumber(x);
    return x;
  }
}
