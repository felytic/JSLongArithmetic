/*jshint esversion: 6 */

const result = document.getElementById('result');
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');

function compare(){
  var a = firstNumber.value;
  var b = secondNumber.value;
  
  result.value = LongNumber.compare(a, b).toString();
}

function absCompare(){
  var a = firstNumber.value;
  var b = secondNumber.value;

  result.value = LongNumber.absCompare(a, b).toString();
}

function add(){
  var a = firstNumber.value;
  var b = secondNumber.value;
  
  result.value = LongNumber.add(a, b).toString();
}


function subtract(){
  var a = firstNumber.value;
  var b = secondNumber.value;
  
  result.value = LongNumber.subtract(a, b).toString();
}

function multiply(){
  var a = firstNumber.value;
  var b = secondNumber.value;
  
  result.value = LongNumber.multiply(a, b).toString();
}

function divide(){
  var a = firstNumber.value;
  var b = secondNumber.value;
  
  result.value = LongNumber.divide(a, b).toString();
}
