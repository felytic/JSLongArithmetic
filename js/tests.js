/*jshint esversion: 6 */
//import LongNumber from "longArithmetic.js";
//import QUnit from "qunit.js";

QUnit.test('Creating long number', function(assert) {
  'use strict';
  var sample = {
    _sign: 0,
    _end: 0,
    _digits: []
  };
  var checked = new LongNumber(0);
  assert.propEqual(checked, sample, '0');

  sample = {
    _sign: 0,
    _end: 0,
    _digits: []
  };
  checked = new LongNumber(0.00000);
  assert.propEqual(checked, sample, '0.00000');

  sample = {
    _sign: -1,
    _end: 2,
    _digits: [2, 1]
  };
  checked = new LongNumber('-1.2e+3');
  assert.propEqual(checked, sample, '-1.2e+3');

  sample = {
    _sign: 1,
    _end: 2,
    _digits: [2, 1]
  };
  checked = new LongNumber('1.2e+3');
  assert.propEqual(checked, sample, '1.2e+3');

  sample = {
    _sign: -1,
    _end: -4,
    _digits: [2, 1]
  };
  checked = new LongNumber('-1.2e-3');
  assert.propEqual(checked, sample, '-1.2e-3');

  sample = {
    _sign: 1,
    _end: -4,
    _digits: [2, 1]
  };

  checked = new LongNumber('1.2e-3');
  assert.propEqual(checked, sample, '1.2e-3');

  sample = {
    _sign: 1,
    _end: -4,
    _digits: [2, 1]
  };

  checked = new LongNumber(1.2e-3);
  assert.propEqual(checked, sample, '1.2e-3');

  sample = {
    _sign: 0,
    _end: 0,
    _digits: []
  };
  checked = new LongNumber('000000');
  assert.propEqual(checked, sample, '000000');

  sample = {
    _sign: 1,
    _end: 0,
    _digits: [1]
  };
  checked = new LongNumber(1);
  assert.propEqual(checked, sample, '1');

  sample = {
    _sign: 1,
    _end: -3,
    _digits: [1, 2, 0, 0, 2, 1]
  };
  checked = new LongNumber(120.021);
  assert.propEqual(checked, sample, '120.021');

  sample = {
    _sign: -1,
    _end: -1,
    _digits: [6, 7]
  };
  checked = new LongNumber(-7.6);
  assert.propEqual(checked, sample, '-7.6');

  sample = {
    _sign: -1,
    _end: -101,
    _digits: [7, 8]
  };
  checked = new LongNumber(-8.7e-100);
  assert.propEqual(checked, sample, '-8.7e-100');

  sample = {
    _sign: 1,
    _end: 3,
    _digits: [1]
  };
  checked = new LongNumber('1000');
  assert.propEqual(checked, sample, '1000');

  sample = {
    _sign: 1,
    _end: 4,
    _digits: [8, 3, 9, 2, 4, 5, 0, 0, 0, 6, 7, 1, 4, 9, 1, 8]
  };
  checked = new LongNumber('00081941760005429380000.00');
  assert.propEqual(checked, sample, '00081941760005429380000.00');

  sample = {
    _sign: 1,
    _end: -1,
    _digits: [8, 8, 2, 0, 5, 7, 1, 9, 1, 4, 0, 1, 5, 1, 4, 7]
  };
  checked = new LongNumber('741510419175028.80000000000');
  assert.propEqual(checked, sample, '741510419175028.80000000000');


  for (let i = 0; i < 10; i++) {
    sample = Math.random();
    checked = new LongNumber(sample);
    assert.equal(checked.toString(), String(sample), String(sample));
  }

  for (let i = 0; i < 10; i++) {
    sample = -Math.random();
    checked = new LongNumber(sample);
    assert.equal(checked.toString(), String(sample), String(sample));
  }

  for (let i = 0; i < 10; i++) {
    sample = Math.random() * 1000000;
    checked = new LongNumber(sample);
    assert.equal(checked.toString(), String(sample), String(sample));
  }

  for (let i = 0; i < 10; i++) {
    sample = -Math.random() * 1000000;
    checked = new LongNumber(sample);
    assert.equal(checked.toString(), String(sample), String(sample));
  }

  for (let i = 0; i < 10; i++) {
    sample = Math.random() * (1e+19);
    checked = new LongNumber(sample + 'e+10');
    assert.equal(checked.toString(), sample + '0000000000', sample + '0000000000');
  }
});

QUnit.test('toString() test', function(assert) {
  'use strict';
  assert.equal((new LongNumber(0)).toString(), '0', '0');
  assert.equal((new LongNumber('-0')).toString(), '0', '0');
  assert.equal((new LongNumber(1)).toString(), '1', '1');
  assert.equal((new LongNumber(-1)).toString(), '-1', '-1');
});
/*
QUnit.test('Creating LongNumber speed test', function(assert){
  for (let i = 0; i < 1000000; i++) {
    let a = new LongNumber(Math.random() * 1000000);
  }
  assert.equal(1, 1, '1000000 creations');
});

QUnit.test('Creating number speed test', function(assert){
  for (let i = 0; i < 1000000; i++) {
    let a = Math.random() * 1000000;
  }
  assert.equal(1, 1, '1000000 creations');
});
/*
QUnit.test('Comparing two long numbers', function(assert) {
  assert.equal(longCompare(new LongNumber(0), new LongNumber(0)), 0, '0 == 0 ');
  assert.equal(longCompare(new LongNumber(1), new LongNumber(1)), 0, '1 == 1 ');
  assert.equal(longCompare(new LongNumber(-1), new LongNumber(-1)), 0, '-1 == -1 ');
  assert.equal(longCompare(new LongNumber(12.34), new LongNumber(12.34)), 0, '12.34 == 12.34 ');
  assert.equal(longCompare(new LongNumber(1e+2), new LongNumber(100)), 0, '1e+2 == 100 ');
  assert.equal(longCompare(new LongNumber(-0), new LongNumber(0)), 0, '-0 == 0 ');

  assert.equal(longCompare(new LongNumber(1), new LongNumber(0)), 1, '1 > 0 ');
  assert.equal(longCompare(new LongNumber(1000), new LongNumber(100)), 1, '1000 > 100 ');
  assert.equal(longCompare(new LongNumber(1.00000000001), new LongNumber(1)), 1, '1.00000000001 > 1 ');
  assert.equal(longCompare(new LongNumber(87e-45), new LongNumber(87e-46)), 1, '87e-45 > 87e-46 ');

  assert.equal(longCompare(new LongNumber(0), new LongNumber(1)), -1, '0 < 1 ');
  assert.equal(longCompare(new LongNumber(100), new LongNumber(1000)), -1, '100 < 1000 ');
  assert.equal(longCompare(new LongNumber(1), new LongNumber(1.00000000001)), -1, '1 < 1.00000000001 ');
  assert.equal(longCompare(new LongNumber(87e-46), new LongNumber(87e-45)), -1, '87e-46 < 87e-45 ');

  assert.equal(longCompare(new LongNumber(0), new LongNumber(-1)), 1, '0 > -1 ');
  assert.equal(longCompare(new LongNumber(100), new LongNumber(-1000)), 1, '100 > -1000 ');
  assert.equal(longCompare(new LongNumber(1), new LongNumber(-1.00000000001)), 1, '1 > -1.00000000001 ');
  assert.equal(longCompare(new LongNumber(87e-46), new LongNumber(-87e-45)), 1, '87e-46 > -87e-45 ');

  assert.equal(longCompare(new LongNumber(-100), new LongNumber(-1000)), 1, '-100 > -1000 ');
  assert.equal(longCompare(new LongNumber(-1), new LongNumber(-1.00000000001)), 1, '-1 > -1.00000000001 ');
  assert.equal(longCompare(new LongNumber(-87e-46), new LongNumber(-87e-45)), 1, '-87e-46 >  -87e-45 ');
});

QUnit.test('Adding long number', function(assert) {
  var sample = new LongNumber(0);
  var checked = longAdd(new LongNumber(0), new LongNumber(0));
  assert.propEqual(checked, sample, '0 + 0 = 0 ');

  var sample = new LongNumber(1);
  var checked = longAdd(new LongNumber(0), new LongNumber(1));
  assert.propEqual(checked, sample, '0 + 1 = 1 ');

  var sample = new LongNumber(1.23);
  var checked = longAdd(new LongNumber(1.23), new LongNumber(0));
  assert.propEqual(checked, sample, '1.23 + 0 = 0 ');

  var sample = new LongNumber(5.79);
  var checked = longAdd(new LongNumber(1.23), new LongNumber(4.56));
  assert.propEqual(checked, sample, '1.23 + 4.56 = 5.79 ');

  var sample = new LongNumber(1000);
  var checked = longAdd(new LongNumber(999.9999), new LongNumber(0.0001));
  assert.propEqual(checked, sample, '999.9999 + 0.0001 = 1000');

  for (var i = 0; i < 10; i++) {
    var a = +String(Math.random() / 2).slice(0, 6);
    var b = +String(Math.random() / 2).slice(0, 6);
    var c = +(a + b).toPrecision(6);

    var sample = new LongNumber(c);
    var checked = longAdd(new LongNumber(a), new LongNumber(b));
    assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
  }

  for (var i = 0; i < 10; i++) {
    var a = +String(Math.random() * 1000000).slice(0, 12);
    var b = +String(Math.random() * 1000000).slice(0, 12);
    var c = +(a + b).toPrecision(13);

    var sample = new LongNumber(c);
    var checked = longAdd(new LongNumber(a), new LongNumber(b));
    assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
  }


  for (var i = 0; i < 10; i++) {
    var a = -Math.floor(Math.random() * Math.pow(10, 10));
    var b = -Math.floor(Math.random() * Math.pow(10, 10));
    var c = a + b;

    var sample = new LongNumber(c);
    var checked = longAdd(new LongNumber(a), new LongNumber(b));
    assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
  }

  var a = new LongNumber('1e+10000');
  a.__end = -10000;
  a.numbers = {
    '10000': 8,
    '9999': 8,
    0: 1,
    '-10000': 7,
  };
  var c = new LongNumber('1e+10001');
  c.__end = -10000;
  c.numbers = {
    '10001': 1,
    '10000': 7,
    '9999': 6,
    0: 2,
    '-9999': 1,
    '-10000': 4,
  };
  var sample = c;
  var checked = longAdd(a, a);
  assert.propEqual(checked, sample, a + ' + ' + a + ' = ' + c);
});
*/
QUnit.test('Incrementing number', function(assert) {

  var checked = new LongNumber(0);
  checked.inc(new LongNumber(1));
  var sample = new LongNumber(1);
  assert.propEqual(checked, sample, '0 += 1 == 1');

  checked = new LongNumber(1);
  checked.inc(new LongNumber(1));
  sample = new LongNumber(2);
  assert.propEqual(checked, sample, '1 += 1 == 2');

  checked = new LongNumber(1.234);
  checked.inc(new LongNumber(1));
  sample = new LongNumber(2.234);
  assert.propEqual(checked, sample, '1.234 += 1 == 2.234');

  checked = new LongNumber(999.9999);
  checked.inc(new LongNumber(0.0001));
  sample = new LongNumber(1000);
  assert.propEqual(checked, sample, '999.9999 += 0.0001 == 1000');

  checked = new LongNumber('14e+70');
  checked.inc(new LongNumber('23e+65'));
  sample = new LongNumber('1400023e+65');
  assert.propEqual(checked, sample, '14e+70 += 23e+65 == 1400023e+65');


  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() / 2).slice(0, 6);
    let b = +String(Math.random() / 2).slice(0, 6);
    let c = +(a + b).toPrecision(6);

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    checked.inc(new LongNumber(b));
    assert.propEqual(checked, sample, a + ' =+ ' + b + ' = ' + c);
  }

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() * 1000000).slice(0, 12);
    let b = +String(Math.random() * 1000000).slice(0, 12);
    let c = +(a + b).toPrecision(13);

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    checked.inc(new LongNumber(b));
    assert.propEqual(checked, sample, a + ' =+ ' + b + ' = ' + c);
  }


  for (let i = 0; i < 10; i++) {
    let a = -Math.floor(Math.random() * Math.pow(10, 10));
    let b = -Math.floor(Math.random() * Math.pow(10, 10));
    let c = a + b;

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    checked.inc(new LongNumber(b));
    assert.propEqual(checked, sample, a + ' =+ ' + b + ' = ' + c);
  }
});