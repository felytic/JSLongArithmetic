/*jshint esversion: 6 */ 

//-------- Long Number class ----------------
var pattern = /^([+-])?0*(\d*?)(0*)(\.(0*)(\d*?)0*)?(e([+-]?\d+))?$/;
const base = 15; //10^15

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
    var shift = Math.abs(this.end % base);    
    if (this.end < 0 && shift != 0) {
      shift = base - shift;
    }
    this.end -= shift;
    var endZeroes = '';
    for (let i = 0; i < shift; i++) endZeroes += '0';
    digits += endZeroes;
    this.digits = {};
    this.begin = Math.floor((this.end + digits.length - 1) / base);
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
    var begin = this.begin > 0 ? this.begin : 0;
    var end = this.end < 0 ? this.end : 0;
    for (let i = begin; i >= end; i--){
      if (i == -1) {
        str += '.'
      }
      digit = this.digits[i] ? '' + this.digits[i] : '0';
      if ((i < this.begin) || (i < 0)) {
        while (digit.length < base) digit = '0' + digit;
      }
      str += digit;
    }
    var lastDigit = str.length - 1;
    if (this.end < 0){
      while (str[lastDigit] == "0") lastDigit--;
    }
    return str.substring(0, lastDigit + 1);
  }
  
  invert(){
    var result = this.clone();
    result.sign = -this.sign;
    return result;
  }

  clone(){
    var result = new LongNumber();
    if (this.sign == 0) return result;

    result.begin = this.begin;
    result.end = this.end;
    result.sign = this.sign;
    result.digits = {};
    for (var item in this.digits){
      result.digits[item] = this.digits[item];
    }
    return result;
  }

  //----------Static Methods ---------------------
  static compare(longA, longB) {
    longA = LongNumber.toLongNumber(longA);
    longB = LongNumber.toLongNumber(longB);
    if (longA.sign > 0) {
      if (longB.sign <= 0) return 1;
      return LongNumber.absCompare(longA, longB);
    }
    if (longA.sign < 0) {
      if (longB.sign >= 0) return -1;
      return LongNumber.absCompare(longB, longA);
    }
    if (longB.sign > 0) return -1;
    if (longB.sign === 0) return 0;
    if (longB.sign < 0) return 1;
  }

  static absCompare(longA, longB) {
    longA = LongNumber.toLongNumber(longA);
    longB = LongNumber.toLongNumber(longB);
    if (longA.begin > longB.begin) return 1;
    if (longA.begin < longB.begin) return -1;
    for (var i = longA.begin; i >= longA.end; i--) {
      var a = longA.digits[i] ? longA.digits[i] : 0;
      var b = longB.digits[i] ? longB.digits[i] : 0;
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
  
  static add(a, b){
    toLongNumber(a);
    toLongNumber(b);
    
  }
} 

