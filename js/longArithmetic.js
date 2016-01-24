/*jshint esversion: 6 */
//-------- Long Number class ----------------
class LongNumber {
  constructor(number = 0) {
    number = String(number);
    //Check for number pattern ex: -123.456e+20
    var pattern = /^([+-])?0*(\d*?)(0*)(\.(0*)(\d*?)0*)?(e([+-]?\d+))?$/;
    var match = pattern.exec(number);
    if (!match) throw new TypeError('Wrong number format');

    const sign = match[1];
    const mainDigits = match[2];
    const zeroesBeforeDot = match[3];
    const zeroesAfterDot = match[5];
    const digitsAfterDot = match[6];
    const e = match[8];

    this._end = e ? +e : 0;
    this._sign = sign == '-' ? -1 : 1;
    if (digitsAfterDot) {
      this._end -= digitsAfterDot.length + zeroesAfterDot.length;
      if (mainDigits) {
        this._digits = new Array(digitsAfterDot.length + mainDigits.length + zeroesBeforeDot.length + zeroesAfterDot.length);
        for (let i = zeroesAfterDot.length - 1; i >= 0; i--) {
          this._digits[zeroesAfterDot.length - i - 1 + digitsAfterDot.length] = +zeroesAfterDot[i];
        }
        for (let i = zeroesBeforeDot.length - 1; i >= 0; i--) {
          this._digits[zeroesBeforeDot.length - i - 1 + zeroesAfterDot.length + digitsAfterDot.length] = +zeroesBeforeDot[i];
        }
        for (let i = mainDigits.length - 1; i >= 0; i--) {
          this._digits[mainDigits.length - i - 1 + zeroesBeforeDot.length + zeroesAfterDot.length + digitsAfterDot.length] = +mainDigits[i];
        }
      } else {
        this._digits = new Array(digitsAfterDot.length);
      }
      for (let i = digitsAfterDot.length - 1; i >= 0; i--) {
        this._digits[digitsAfterDot.length - i - 1] = +digitsAfterDot[i];
      }
    } else {
      this._end += zeroesBeforeDot.length;
      this._digits = new Array(mainDigits.length);
      if (!mainDigits) {
        this._sign = 0;
        this._end = 0;
        return;
      }
      for (let i = mainDigits.length - 1; i >= 0; i--) {
        this._digits[mainDigits.length - i - 1] = +mainDigits[i];
      }
    }

  }

  _accessError(propertyName) {
    throw new Error('Unable to set property ' + propertyName + ' from outside of the class');
  }

  //------ Getters and setters ------------------------------
  get sign() { return this._sign;}
  set sign(value) { this._accessError('sign');  }

  get digits() { return this._digits.map(i => i); }
  set digits(value) { this._accessError('digits'); }

  get begin() { return this._digits.length + this._end - 1; }
  set begin(value) { this._accessError('begin'); }


  get end() { return this._end; }
  set end(value) { this._accessError('end'); }

  //------ Methods --------------------------------------
  invert() { this._sign = -this._sign;}

  toString() {
    if (this._sign === 0) return '0';
    var str = -this._end >= this._digits.length ? '0.' : '';
    for (let i = -this._end - this._digits.length; i > 0; i--) str += '0';
    for (let i = this._digits.length - 1; i >= 0; i--) {
      if (-this._end == i + 1 && str != '0.') str += '.';
      str += this._digits[i];
    }
    for (let i = 0; i < this._end; i++) str += '0';
    return this._sign < 0 ? '-' + str : str;
  }

//-----Incrementing current number by another log number ----
  inc(longN = 1) {
    longN = LongNumber.toLongNumber(longN);
    if (longN.sign === 0) return;
    if (longN.sign != this._sign) {
      if (this.sign === 0){
	this._digits = longN.digits;
	this._sign = longN.sign;
	return;
      }
      longN.invert();
      this.dec(longN);
      longN.invert();
      return;
    }

    var nums = longN.digits;
    var sum = this._digits;

    //         [..this.digits..]   __\   [.......this.digits..]
    //    [..longN.digits..]         /   [..longN.digits..]
    var addedAfter = 0;
    if (longN.end < this._end) {
      addedAfter = this._end - longN.end;
      Array.prototype.unshift.apply(sum, new Array(addedAfter));
      this._end = longN.end;
      for (let i = 0; i < addedAfter; i++) {
	sum[i] = nums[i] ? nums[i] : 0;
      }
    }

    //[..this.digits..]           __\   [..this.digits..........]
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
    var from =  Math.max(this._end + addedAfter, longN.end + addedAfter);
    var to = Math.min(this.begin - addedBefore, longN.begin);
    for (var i = from; i <= to; i++) {
      sum[i - this._end] += nums[i - longN.end];
    }
    
    const last =  sum.length - 1;
    for (let i = from - this._end; i < last; i++){
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
	this._digits = longN.digits;
	this._sign = -longN.sign;
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
    for (var i = 0; this._digits[i] === 0; i++);
    this._end += i;
    if (i) this._digits.splice(0, i);
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
