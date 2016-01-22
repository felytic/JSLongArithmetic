/*jshint esversion: 6 */
'use strict';
QUnit.test('Creating long number', function(assert) {
  var sample = {
    sign: 0,
    end: 0,
    digits: []
  };
  var checked = new LongNumber(0);
  assert.propEqual(checked, sample, '0');

  sample = {
    sign: 0,
    end: 0,
    digits: []
  };
  checked = new LongNumber(0.00000);
  assert.propEqual(checked, sample, '0.00000');

  sample = {
    sign: 0,
    end: 0,
    digits: []
  };
  checked = new LongNumber('000000');
  assert.propEqual(checked, sample, '000000');

  sample = {
    sign: 1,
    end: 0,
    digits: [1]
  };
  checked = new LongNumber(1);
  assert.propEqual(checked, sample, '1');

  sample = {
    sign: -1,
    end: -1,
    digits: [6, 7]
  };
  checked = new LongNumber(-7.6);
  assert.propEqual(checked, sample, '-7.6');

  sample = {
    sign: -1,
    end: -101,
    digits: [7, 8]
  };
  checked = new LongNumber(-8.7e-100);
  assert.propEqual(checked, sample, '-8.7e-100');

  sample = {
    sign: 1,
    end: 3,
    digits: [1]
  };
  checked = new LongNumber('1000');
  assert.propEqual(checked, sample, '1000');

  sample = {
    sign: 1,
    end: 4,
    digits: [8, 3, 9, 2, 4, 5, 0, 0, 0, 6, 7, 1, 4, 9, 1, 8]
  };
  checked = new LongNumber('00081941760005429380000.00');
  assert.propEqual(checked, sample, '00081941760005429380000.00');

  /*for (var i = 0; i < 10; i++) {
    var sample = Math.random();
    var checked = new LongNumber(sample);
    assert.equal(checked.toString(), String(sample), String(sample));
  }

  for (var i = 0; i < 10; i++) {
    var sample = -Math.random();
    var checked = new LongNumber(sample);
    assert.equal(checked.toString(), String(sample), String(sample));
  }

  for (var i = 0; i < 10; i++) {
    var sample = Math.random() * 1000000;
    var checked = new LongNumber(sample);
    assert.equal(String(sample), checked.toString(), String(sample));
  }

  for (var i = 0; i < 10; i++) {
    var sample = -Math.random() * 1000000;
    var checked = new LongNumber(sample);
    assert.equal(String(sample), checked.toString(), String(sample));
  }*/
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
  a.end = -10000;
  a.numbers = {
    '10000': 8,
    '9999': 8,
    0: 1,
    '-10000': 7,
  };
  var c = new LongNumber('1e+10001');
  c.end = -10000;
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

QUnit.test('Incrementing number', function(assert) {
  var sample = new LongNumber(0);
  sample.inc(new LongNumber(1));
  var checked = new LongNumber(1);
  assert.propEqual(checked, sample, '0 += 1 == 1');

  var sample = new LongNumber(1);
  sample.inc(new LongNumber(1));
  var checked = new LongNumber(2);
  assert.propEqual(checked, sample, '1 += 1 == 2');

  var sample = new LongNumber(1.234);
  sample.inc(new LongNumber(1));
  var checked = new LongNumber(2.234);
  assert.propEqual(checked, sample, '1.234 += 1 == 2.234');

  var sample = new LongNumber(999.9999);
  sample.inc(new LongNumber(0.0001));
  var checked = new LongNumber(1000);
  assert.propEqual(checked, sample, '999.9999 += 0.0001 == 1000');

  var sample = new LongNumber(-999.9999);
  sample.inc(new LongNumber(-0.0001));
  var checked = new LongNumber(-1000);
  assert.propEqual(checked, sample, '-999.9999 += -0.0001 == -1000');

  for (var i = 0; i < 10; i++) {
    var a = +String(Math.random() / 2).slice(0, 6);
    var b = +String(Math.random() / 2).slice(0, 6);
    var c = +(a + b).toPrecision(6);

    var sample = new LongNumber(c);
    var checked = new LongNumber(a);
    checked.inc(new LongNumber(b));
    assert.propEqual(checked, sample, a + ' =+ ' + b + ' = ' + c);
  }

  for (var i = 0; i < 10; i++) {
    var a = +String(Math.random() * 1000000).slice(0, 12);
    var b = +String(Math.random() * 1000000).slice(0, 12);
    var c = +(a + b).toPrecision(13);

    var sample = new LongNumber(c);
    var checked = new LongNumber(a);
    checked.inc(new LongNumber(b));
    assert.propEqual(checked, sample, a + ' =+ ' + b + ' = ' + c);
  }


  for (var i = 0; i < 10; i++) {
    var a = -Math.floor(Math.random() * Math.pow(10, 10));
    var b = -Math.floor(Math.random() * Math.pow(10, 10));
    var c = a + b;

    var sample = new LongNumber(c);
    var checked = new LongNumber(a);
    checked.inc(new LongNumber(b));
    assert.propEqual(checked, sample, a + ' =+ ' + b + ' = ' + c);
  }
});
*/
