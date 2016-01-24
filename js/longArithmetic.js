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
  get sign() {
    return this._sign;
  }
  set sign(value) {
    this._accessError('sign');
  }

  get digits() {
    return this._digits.map(i => i);
  }
  set digits(value) {
    this._accessError('digits');
  }

  get begin() {
    return this._digits.length + this._end - 1;
  }
  set begin(value) {
    this._accessError('begin');
  }


  get end() {
    return this._end;
  }
  set end(value) {
    this._accessError('end');
  }

  //------ Methods --------------------------------------
  invert() {
    this._sign = -this._sign;
  }

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

  inc(longN = 1) {
     if (!(longN instanceof(LongNumber))){
      longN = new LongNumber(longN);
    }
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
    var addedBefore = 0;
    var addedAfter = 0;

    if (longN.end < this._end) {
      addedAfter = this._end - longN.end;
      Array.prototype.unshift.apply(this._digits, new Array(addedAfter));
      this._end = longN.end;
    }

    if (longN.begin > this.begin) {
      addedBefore = longN.begin - this.begin;
      Array.prototype.push.apply(this._digits, new Array(addedBefore));
    }

    for (let i = 0; i < addedAfter; i++) {
      this._digits[i] = nums[i] ? nums[i] : 0;
    }

    for (let i = 0; i < addedBefore; i++) {
      this._digits[this.digits.length - i - 1] = nums[nums.length - i - 1] ? nums[nums.length - i - 1] : 0;
    }

    var to = Math.min(this.begin - addedBefore + 1, longN.begin);
    for (var i = Math.max(this._end + addedAfter, longN.end + addedAfter); i < to; i++) {
      let pos = i - this._end;
      this._digits[pos] += nums[i - longN.end];
      if (this._digits[pos] > 9) {
        this._digits[pos] -= 10;
        this._digits[pos + 1] += 1;
      }
    }

    let pos = to - this._end;
    if ((pos < this._digits.length - addedBefore) && (i == to)) this._digits[pos] += nums[to - longN.end];
    if (this._digits[pos] > 9) {
      this._digits[pos] -= 10;
      if (!this._digits[pos + 1]) {
        this._digits[pos + 1] = 1;
      } else {
        this._digits[pos + 1] += 1;
      }
    }

    for (let i = pos + 1; i < this._digits.length - 1; i++){
      if (this._digits[i] > 9){
	this._digits[i] -= 10;
	this._digits[i + 1] += 1;
      } else {
	break;
      }
    }
    if (this._digits[this._digits.length - 1] > 9){
      this._digits[this._digits.length - 1] -= 10;
      this._digits.push(1);
    }

    for (var i = 0; this._digits[i] === 0; i++);
    this._end += i;
    this._digits.splice(0, i);

  }


  dec(longN = 1) {
    if (!(longN instanceof(LongNumber))){
      longN = new LongNumber(longN);
    }
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

}

/*function LongNumber(number) {
  this.sign = number > 0 ? 1 : -1;4
  if (!number) {
    number = 0;
    this.sign = 0;
  }
  var dividedByE = +String(number).split(/e(?=[+-])/g);
  var e = dividedByE[1] ? +dividedByE[1] : 0;
  this.begin = dividedByE[0].indexOf('.');
  var numbersArray = stringNumber.split(/[.]?/).map(i => +i);
  this.numbers = {};
  for (var i = 0; i < numbersArray.length; i++) {
    if (numbersArray[i]) {
      if (this.begin === undefined) this.begin = numbersArray.length - i - numbersAfterComma - 1;
      this.end = numbersArray.length - i - numbersAfterComma - 1;
      this.numbers[numbersArray.length - i - numbersAfterComma - 1] = numbersArray[i];
    }
  }
}

LongNumber.prototype.toString = function() {
  var s = this.sign < 0 ? '-' : '';
  var from = this.begin > 0 ? this.begin : 0;
  var to = this.end < 0 ? this.end : 0;
  for (var i = from; i >= to; i--) {
    if (i == -1) s += '.';
    if (this.numbers[i]) {
      s += this.numbers[i];
    } else {
      s += '0';
    }
  }
  return s;
};


LongNumber.prototype.inc = function(longN) {
  lAdd(this, longN, this);
};
//-------------------------------------

function longAdd(longA, longB) {
  var result = new LongNumber();
  lAdd(longA, longB, result);
  return result;
}

function lAdd(longA, longB, result) {
  if (!((longA instanceof(LongNumber)) && (longB instanceof(LongNumber)) && (result instanceof(LongNumber)))) throw new TypeError('The arguments must be of type LongNumber');
  if ((longA.sign) && (longA.sign == longB.sign)) {
    result.sign = longA.sign;
    result.begin = Math.max(longA.begin, longB.begin);
    result.end = Math.min(longA.end, longB.end);
    var end;
    var nums = result.numbers;
    for (var i = result.end; i <= result.begin; i++) {
      var a = (longA.numbers[i] && result != longA) ? longA.numbers[i] : 0;
      var b = longB.numbers[i] ? longB.numbers[i] : 0;
      if (a + b) {
        nums[i] = nums[i] ? nums[i] + a + b : a + b;
      }
      if (nums[i] > 9) {
        nums[i] -= 10;
        nums[i + 1] = nums[i + 1] ? nums[i + 1] + 1 : 1;
        if (!nums[i]) delete nums[i];
      }
      if ((end === undefined) && (nums[i])) end = i;
    }
    if (nums[i]) result.begin = i;
    result.end = end === undefined ? result.begin : end;
  } else {
    if (longB.sign === 0) clone(longA, result);
    if (longA.sign === 0) clone(longB, result);
    if (!(longA.sign || longB.sign)) longSubtract(longA, longB, result);
  }
}

function longSubtract(longA, longB, result) {
  if (!((longA instanceof(LongNumber)) && (longB instanceof(LongNumber)))) throw new TypeError('The argumentns must be of type LongNumber');
  if (longA.sign == longB.sign) {

  } else {
    if (longB.sign === 0) return longA;
    if (longA.sign === 0) return longB;
    result = longAdd(longA, longB);
  }
}

function longCompare(longA, longB) {
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

function longAbsCompare(longA, longB) {
  if (!((longA instanceof(LongNumber)) && (longB instanceof(LongNumber)))) throw new TypeError('The argumentns must be of type LongNumber');
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

function clone(obj, copy) {
  if (obj === null || typeof obj != "object") return obj;
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      if (typeof attr == 'object') copy[attr] = clone(obj[attr]);
      else copy[attr] = obj[attr];
    }
  }
}
*/
