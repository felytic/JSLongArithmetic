/*jshint esversion: 6 */
'use strict';
//-------- Long Number class ----------------
class LongNumber {

  constructor(number) {
    //Constructor with empty args creates 0 number
    if (!number) number = 0;
    number = String(number);
    //Check for number pattern ex: -123.456e+20
    var pattern = new RegExp(/^[+-]?\d+\.?(\d+)?(e[+-]\d+)?$/g);
    if (!pattern.test(number)) throw new TypeError('Wrong number format');

    var splittedE = String(number).split(/e(?=[+-][0-9]+$)/); //cut 'e+-d...'
    var e = +splittedE[1] ? +splittedE[1] : 0;

    var numStr = splittedE[0];
    this.sign = numStr[0] == '-' ? -1 : 1; //1: >0, -1: <0, 0: 0;
    var dotPos = -1;

    //remove zeros and sign at the begin
    var i = 0;
    if (numStr[0] === '+' || numStr[0] == '-') i++;
    for (; numStr[i] === '0'; i++);
    if (numStr[i] === '.'){
      dotPos = i;
      i++;
      for (; numStr[i] === '0'; i++);
    }

    for (var j = numStr.length - 1; numStr[j] === '0'; j--);
    if (numStr[j] === '.'){
      dotPos = j;
      j--;
      for (; numStr[j] === '0'; j--);
    }
    var dot = numStr.indexOf('.');
    if (dotPos == -1) dotPos = dot > -1 ? dot : numStr.length;
    //'end' represents power of 10 of last numbers'digit ex: 456.34: -2, 0.6: -1
    this.end =  dotPos - j + e;

    if (i > j) {
      this.sign = 0;
      this.end = 0;
      this.digits = [];
      return;
    }
    this.digits = new Array(j - i + 1 - (dotPos != numStr.length));
    for (var k = j; k > dotPos ; k--) this.digits[j - k] = +numStr[k];
    if (dotPos > j) {
      this.end--;
      for (; k>= i; k--) this.digits[j - k] = +numStr[k];
    } else {
      for (k--; k>= i; k--) this.digits[j - k - 1] = +numStr[k];
    }

  }


  invert() {
    this.sign = -this.sign;
  }

  toString(){
    if (this.sign === 0) return '0';
    var str = '';
    for (let i = this.digits.length - 1; i >= 0; i--){
      if (-this.end == i + 1) str += '.';
      str += this.digits[i];
    }
    return this.sign < 0 ? '-' + str: str;
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
