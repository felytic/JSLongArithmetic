'use strict';

//-------- Long Number class ----------------
function LongNumber(number) {
  if (!number) number = 0;
  this.sign = number > 0 ? 1 : number == 0 ? 0 : -1;
  var stringNumber = String(number);
  var e = 0;
  var eIndex = stringNumber.indexOf('e');
  if (eIndex > -1) {
    e = +stringNumber.slice(eIndex + 1);
    stringNumber = stringNumber.slice(0, eIndex);
  }
  var numbersAfterComma = (stringNumber.length - stringNumber.indexOf('.') - 1) % stringNumber.length - e;
  var numbersArray = stringNumber.split(/[.]?/).map(i => +i);

  this.end = 0;
  this.numbers = {};
  for (var i = 0; i < numbersArray.length; i++) {
    if (numbersArray[i]) {
      if (this.begin == undefined) this.begin = numbersArray.length - i - numbersAfterComma - 1;
      this.end = numbersArray.length - i - numbersAfterComma - 1;
      this.numbers[numbersArray.length - i - numbersAfterComma - 1] = numbersArray[i];
    }
  }
  if (this.begin == undefined) this.begin = 0;
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

LongNumber.prototype.inverse = function() {
  this.sign = -this.sign;
};
//-------------------------------------

function longAdd(longA, longB) {
  if (!((longA instanceof(LongNumber)) && (longB instanceof(LongNumber)))) throw new TypeError('The argumentns must be of type LongNumber');
  var result;
  if (longA.sign == longB.sign) {
    result = new LongNumber();
    result.sign = longA.sign;
    result.begin = Math.max(longA.begin, longB.begin);
    result.end = Math.min(longA.end, longB.end);
    var end;
    var nums = result.numbers;
    for (var i = result.end; i <= result.begin; i++) {
      var a = longA.numbers[i] ? longA.numbers[i] : 0;
      var b = longB.numbers[i] ? longB.numbers[i] : 0;
      if (a + b) {
        nums[i] = nums[i] ? nums[i] + a + b : a + b;
      }
      if (nums[i] > 9) {
        nums[i] -= 10;
        nums[i + 1] = nums[i + 1] ? nums[i + 1] + 1 : 1;
        if (!nums[i]) delete nums[i];
      }
      if ((end == undefined) && (nums[i])) end = i;
    }
    if (nums[i]) result.begin = i;
    result.end = end == undefined ? result.begin : end;
  } else {
    if (longB.sign == 0) return longA;
    if (longA.sign == 0) return longB;
    result = longSubtract(longA, longB);
  }
  return result;
}

function longSubtract(longA, longB) {

}