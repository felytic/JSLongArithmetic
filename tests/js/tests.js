/*jshint esversion: 6 */
//import LongNumber from 'longArithmetic.js';
//import QUnit from 'qunit.js';

QUnit.test('Creating long number', function(assert) {
  'use strict';
  var sample = {
    sign: 0,
    end: 0,
    begin: 0,
    digits: {}
  };
  var checked = new LongNumber(0);
  assert.propEqual(checked, sample, '0');

  sample = {
    sign: 0,
    begin: 0,
    end: 0,
    digits: {}
  };
  checked = new LongNumber(0.00000);
  assert.propEqual(checked, sample, '0.00000');

  sample = {
    sign: 0,
    begin: 0,
    end: 0,
    digits: {}
  };
  checked = new LongNumber('000000');
  assert.propEqual(checked, sample, '000000');

  sample = {
    sign: 1,
    begin: 0,
    end: 0,
    digits: {
      0: 1
    }
  };
  checked = new LongNumber(1);
  assert.propEqual(checked, sample, '1');


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
    assert.equal(checked.toString(), sample + '0000000000',
      sample + '0000000000');
  }
});

/*
   QUnit.test('toString() test', function(assert) {
   'use strict';
   assert.equal((0)).toString(), '0', '0');
   assert.equal(('-0')).toString(), '0', '0');
   assert.equal((1)).toString(), '1', '1');
   assert.equal((-1)).toString(), '-1', '-1');
   });

   QUnit.test('Creating LongNumber speed test', function(assert){
   for (let i = 0; i < 1000000; i++) {
   let a = Math.random() * 1000000);
   }
   assert.equal(1, 1, '1000000 creations');
   });

   QUnit.test('Creating number speed test', function(assert){
   for (let i = 0; i < 1000000; i++) {
   let a = Math.random() * 1000000;
   }
   assert.equal(1, 1, '1000000 creations');
   });
 */

QUnit.test('Comparing two long numbers', function(assert) {
  assert.equal(LongNumber.compare(0, 0), 0, '0 == 0 ');

  assert.equal(LongNumber.compare(1, 1), 0, '1 == 1 ');

  assert.equal(LongNumber.compare(-1, -1), 0, '-1 == -1 ');

  assert.equal(LongNumber.compare(12.34, 12.34), 0, '12.34 == 12.34 ');

  assert.equal(LongNumber.compare(1e+2, 100), 0, '1e+2 == 100 ');

  assert.equal(LongNumber.compare(-0, 0), 0, '-0 == 0 ');

  assert.equal(LongNumber.compare(1, 0), 1, '1 > 0 ');

  assert.equal(LongNumber.compare(1000, 100), 1, '1000 > 100 ');

  assert.equal(LongNumber.compare(1.00000000001, 1), 1, '1.00000000001 > 1 ');

  assert.equal(LongNumber.compare(87e-45, 87e-46), 1, '87e-45 > 87e-46 ');

  assert.equal(LongNumber.compare(0, 1), -1, '0 < 1 ');

  assert.equal(LongNumber.compare(100, 1000), -1, '100 < 1000 ');

  assert.equal(LongNumber.compare(1, 1.00000000001), -1, '1 < 1.00000000001');

  assert.equal(LongNumber.compare(87e-46, 87e-45), -1, '87e-46 < 87e-45 ');

  assert.equal(LongNumber.compare(0, -1), 1, '0 > -1 ');

  assert.equal(LongNumber.compare(100, -1000), 1, '100 > -1000 ');

  assert.equal(LongNumber.compare(1, -1.0000000001), 1, '1 > -1.0000000001');

  assert.equal(LongNumber.compare(87e-46, -87e-45), 1, '87e-46 > -87e-45 ');

  assert.equal(LongNumber.compare(-100, -1000), 1, '-100 > -1000 ');

  assert.equal(LongNumber.compare(-1, -1.0000000001), 1, '-1 > -1.0000000001');

  assert.equal(LongNumber.compare(-87e-46, -87e-45), 1, '-87e-46 >  -87e-45 ');
});

QUnit.test('Cloning LongNumber', function(assert) {
  var a = new LongNumber(0);
  assert.propEqual(a, a.clone(), '0 = 0');

  for (let i = 0; i < 5; i++) {
    var x = Math.random() * 100 - 50;
    var sample = new LongNumber(x);
    var checked = new LongNumber(x).clone();
    assert.propEqual(checked, sample, x + ' = ' + x);
  }
});

QUnit.test('Inverting LongNumber', function(assert) {

  var a = new LongNumber(0);
  assert.propEqual(a, a.invert(), '0 = -0');
  assert.propEqual(a, a.invert().invert(), '0 = --0');

  for (let i = 0; i < 5; i++) {
    var x = Math.random() * 100 - 50;
    var sample = new LongNumber(x);
    var checked = new LongNumber(-x).invert();
    assert.propEqual(checked, sample, x + ' = -' + x);
  }
});

QUnit.test('Adding long number', function(assert) {
  var sample = new LongNumber(0);
  var checked = LongNumber.add(0, 0);
  assert.propEqual(checked, sample, '0 + 0 = 0 ');

  sample = new LongNumber(1);
  checked = LongNumber.add(0, 1);
  assert.propEqual(checked, sample, '0 + 1 = 1 ');

  sample = new LongNumber(1.23);
  checked = LongNumber.add(1.23, 0);
  assert.propEqual(checked, sample, '1.23 + 0 = 0 ');

  sample = new LongNumber(5.79);
  checked = LongNumber.add(1.23, 4.56);
  assert.propEqual(checked, sample, '1.23 + 4.56 = 5.79 ');

  sample = new LongNumber(1);
  checked = LongNumber.add(-3, 4);
  assert.propEqual(checked, sample, '-3 + 4 = 1');

  sample = new LongNumber(1000);
  checked = LongNumber.add(999.9999, 0.0001);
  assert.propEqual(checked, sample, '999.9999 + 0.0001 = 1000');

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() / 2).slice(0, 6);
    let b = +String(Math.random() / 2).slice(0, 6);
    let c = +(a + b).toPrecision(6);

    sample = new LongNumber(c);
    checked = LongNumber.add(a, b);
    assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
  }

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() * 1000000).slice(0, 12);
    let b = +String(Math.random() * 1000000).slice(0, 12);
    let c = +(a + b).toPrecision(13);

    let sample = new LongNumber(c);
    let checked = LongNumber.add(a, b);
    assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
  }


  for (let i = 0; i < 10; i++) {
    let a = -Math.floor(Math.random() * Math.pow(10, 10));
    let b = -Math.floor(Math.random() * Math.pow(10, 10));
    let c = a + b;

    let sample = new LongNumber(c);
    let checked = LongNumber.add(a, b);
    assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
  }

});

QUnit.test('Incrementing number', function(assert) {

  var checked = new LongNumber(0);
  var sample = new LongNumber(1);
  assert.propEqual(checked.add(1), sample, '0 += 1 == 1');

  checked = new LongNumber(1);
  sample = new LongNumber(2);
  assert.propEqual(checked.add(1), sample, '1 += 1 == 2');

  checked = new LongNumber(1.234);
  sample = new LongNumber(2.234);
  assert.propEqual(checked.add(1), sample, '1.234 += 1 == 2.234');

  checked = new LongNumber(999.9999);
  sample = new LongNumber(1000);
  assert.propEqual(checked.add(0.0001), sample, '999.9999 += 0.0001 == 1000');

  checked = new LongNumber('14e+70');
  sample = new LongNumber('1400023e+65');
  assert.propEqual(checked.add('23e+65'), sample,
    '14e+70 += 23e+65 == 1400023e+65');

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() / 2).slice(0, 6);
    let b = +String(Math.random() / 2).slice(0, 6);
    let c = +(a + b).toPrecision(6);

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    assert.propEqual(checked.add(b), sample, a + ' =+ ' + b + ' = ' + c);
  }

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() * 1000000).slice(0, 12);
    let b = +String(Math.random() * 1000000).slice(0, 12);
    let c = +(a + b).toPrecision(13);

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    assert.propEqual(checked.add(b), sample, a + ' =+ ' + b + ' = ' + c);
  }


  for (let i = 0; i < 10; i++) {
    let a = -Math.floor(Math.random() * Math.pow(10, 10));
    let b = -Math.floor(Math.random() * Math.pow(10, 10));
    let c = a + b;

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    assert.propEqual(checked.add(b), sample, a + ' =+ ' + b + ' = ' + c);
  }
});

QUnit.test('Subtracting long number', function(assert) {
  var sample = new LongNumber(0);
  var checked = LongNumber.subtract(0, 0);
  assert.propEqual(checked, sample, '0 - 0 = 0');

  sample = new LongNumber(-1);
  checked = LongNumber.subtract(0, 1);
  assert.propEqual(checked, sample, '0 - 1 = -1');

  sample = new LongNumber(1.23);
  checked = LongNumber.subtract(1.23, 0);
  assert.propEqual(checked, sample, '1.23 - 0 = 0');


  sample = new LongNumber(4.56);
  checked = LongNumber.subtract(5.79, 1.23);
  assert.propEqual(checked, sample, '5.79 - 1.23 = 4.56');

  sample = new LongNumber();
  checked = LongNumber.subtract(5, 5);
  assert.propEqual(checked, sample, '5 - 5 = 0');

  sample = new LongNumber(1);
  checked = LongNumber.subtract(-3, -4);
  assert.propEqual(checked, sample, '-3 - -4 = 1');

  sample = new LongNumber(999.9999);
  checked = LongNumber.subtract(1000, 0.0001);
  assert.propEqual(checked, sample, '1000 - 0.0001 = 999.9999');

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() / 2).slice(0, 6);
    let b = +String(Math.random() / 2).slice(0, 6);
    let c = +(a - b).toPrecision(6);

    let sample = new LongNumber(c);
    let checked = LongNumber.subtract(a, b);
    assert.propEqual(checked, sample, a + ' - ' + b + ' = ' + c);
  }

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() * 1000000).slice(0, 12);
    let b = +String(Math.random() * 1000000).slice(0, 12);
    let c = +(a - b).toPrecision(13);

    let sample = new LongNumber(c);
    let checked = LongNumber.subtract(a, b);
    assert.propEqual(checked, sample, a + ' - ' + b + ' = ' + c);
  }


  for (let i = 0; i < 10; i++) {
    let a = -Math.floor(Math.random() * Math.pow(10, 10));
    let b = -Math.floor(Math.random() * Math.pow(10, 10));
    let c = a - b;

    let sample = new LongNumber(c);
    let checked = LongNumber.subtract(a, b);
    assert.propEqual(checked, sample, a + ' - ' + b + ' = ' + c);
  }
});


QUnit.test('Decrementing long number', function(assert) {
  var checked = new LongNumber(0);
  var sample = new LongNumber(-1);
  assert.propEqual(checked.subtract(1), sample, '0 -= 1 == -1');

  checked = new LongNumber('23.4e+100');
  sample = new LongNumber(0);
  assert.propEqual(checked.subtract('23.4e+100'), sample,
    '23.4e+100 -= 23.4e+100 == 0');

  checked = new LongNumber(2.234);
  sample = new LongNumber(1.234);
  assert.propEqual(checked.subtract(1), sample, '2.234 -= 1 == 1.234');

  sample = new LongNumber(999.9999);
  checked = new LongNumber(1000);
  assert.propEqual(checked.subtract(0.0001), sample,
    '1000 -= 0.0001 == 999.9999');

  sample = new LongNumber('14e+70');
  checked = new LongNumber('1400023e+65');
  assert.propEqual(checked.subtract('23e+65'), sample,
    '1400023e+65 -= 23e+65 == 14e+70');

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() / 2).slice(0, 6);
    let b = +String(Math.random() / 2).slice(0, 6);
    let c = +(a - b).toPrecision(6);

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    assert.propEqual(checked.subtract(b), sample,
      a + ' =- ' + b + ' = ' + c);
  }

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() * 1000000).slice(0, 12);
    let b = +String(Math.random() * 1000000).slice(0, 12);
    let c = +(a - b).toPrecision(13);

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    assert.propEqual(checked.subtract(b), sample,
      a + ' =- ' + b + ' = ' + c);
  }


  for (let i = 0; i < 10; i++) {
    let a = -Math.floor(Math.random() * Math.pow(10, 10));
    let b = -Math.floor(Math.random() * Math.pow(10, 10));
    let c = a - b;

    sample = new LongNumber(c);
    checked = new LongNumber(a);
    assert.propEqual(checked.subtract(b), sample,
      a + ' =- ' + b + ' = ' + c);
  }
});


QUnit.test('Multiplying long number', function(assert) {
  var sample = new LongNumber(0);
  var checked = LongNumber.multiply(0, 0);
  assert.propEqual(checked, sample, '0 * 0 = 0');

  sample = new LongNumber(0);
  checked = LongNumber.multiply(0, 1);
  assert.propEqual(checked, sample, '0 * 1 = 0');

  sample = new LongNumber(0);
  checked = LongNumber.multiply(1.23, 0);
  assert.propEqual(checked, sample, '1.23 * 0 = 0');

  sample = new LongNumber(5.6088);
  checked = LongNumber.multiply(1.23, 4.56);
  assert.propEqual(checked, sample, '1.23 * 4.56 = 5.6088');

  sample = new LongNumber(0.09999999);
  checked = LongNumber.multiply(999.9999, 0.0001);
  assert.propEqual(checked, sample, '999.9999 * 0.0001 = 0.09999999');

  sample = new LongNumber('20014471685603893831.263910592021986112');
  checked = LongNumber.multiply('2016491153.9650038712',
    '9925395232.331995760');
  assert.propEqual(checked, sample, '2016491153.9650038712 * ' +
    '9925395232.331995760 = 20014471685603893831.263910592021986112');

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() / 2).slice(0, 5);
    let b = +String(Math.random() / 2).slice(0, 5);
    let c = +(a * b).toPrecision(6);

    sample = new LongNumber(c);
    checked = LongNumber.multiply(a, b);
    assert.propEqual(checked, sample, a + ' * ' + b + ' = ' + c);
  }

  for (let i = 0; i < 10; i++) {
    let a = +String(Math.random() * 1000000).slice(0, 5);
    let b = +String(Math.random() * 1000000).slice(0, 5);
    let c = +(a * b);

    let sample = new LongNumber(c);
    let checked = LongNumber.multiply(a, b);
    assert.propEqual(checked, sample, a + ' * ' + b + ' = ' + c);
  }


  for (let i = 0; i < 10; i++) {
    let a = -Math.floor(Math.random() * Math.pow(10, 5));
    let b = -Math.floor(Math.random() * Math.pow(10, 5));
    let c = a * b;

    let sample = new LongNumber(c);
    let checked = LongNumber.multiply(a, b);
    assert.propEqual(checked, sample, a + ' * ' + b + ' = ' + c);
  }

});

QUnit.test('Dividing long number', function(assert) {
  var sample = new LongNumber(0);
  var checked = LongNumber.divide(0, 1);
  assert.propEqual(checked, sample, '0 / 1 = 0');

  sample = new LongNumber(1);
  checked = LongNumber.divide(1, 1);
  assert.propEqual(checked, sample, '1 / 1 = 1');

  sample = new LongNumber(-1.23);
  checked = LongNumber.divide(1.23, -1);
  assert.propEqual(checked, sample, '1.23 / -1 = -1.23');

  sample = new LongNumber(2);
  checked = LongNumber.divide(1, 0.5);
  assert.propEqual(checked, sample, '1 / 0.5 = 2');

  sample = new LongNumber(-2);
  checked = LongNumber.divide(1, -0.5);
  assert.propEqual(checked, sample, '1 / -0.5 = -2');

  sample = new LongNumber('0.213836477987421383647798742138364779874213836477');
  checked = LongNumber.divide(34, 159, 47);
  assert.propEqual(checked, sample,
    '34 / 159 = 0.213836477987421383647798742138364779874213836477');


  /*
    sample = 5.6088);
    checked = LongNumber.multiply(1.23), 4.56));
    assert.propEqual(checked, sample, '1.23 * 4.56 = 5.6088');

    sample = 0.09999999);
    checked = LongNumber.multiply(999.9999),
      0.0001));
    assert.propEqual(checked, sample, '999.9999 * 0.0001 = 0.09999999');

    sample = '20014471685603893831.263910592021986112');
    checked = LongNumber.multiply('2016491153.9650038712'),
      '9925395232.331995760'));
    assert.propEqual(checked, sample, '2016491153.9650038712 * ' +
        '9925395232.331995760 = 20014471685603893831.263910592021986112');

    for (let i = 0; i < 10; i++) {
      let a = +String(Math.random() / 2).slice(0, 5);
      let b = +String(Math.random() / 2).slice(0, 5);
      let c = +(a * b).toPrecision(6);

      sample = c);
      checked = LongNumber.multiply(a), b));
      assert.propEqual(checked, sample, a + ' * ' + b + ' = ' + c);
    }

    for (let i = 0; i < 10; i++) {
      let a = +String(Math.random() * 1000000).slice(0, 5);
      let b = +String(Math.random() * 1000000).slice(0, 5);
      let c = +(a * b);

      let sample = c);
      let checked = LongNumber.multiply(a), b));
      assert.propEqual(checked, sample, a + ' * ' + b + ' = ' + c);
    }


    for (let i = 0; i < 10; i++) {
      let a = -Math.floor(Math.random() * Math.pow(10, 5));
      let b = -Math.floor(Math.random() * Math.pow(10, 5));
      let c = a * b;

      let sample = c);
      let checked = LongNumber.multiply(a), b));
      assert.propEqual(checked, sample, a + ' * ' + b + ' = ' + c);
    }
  */
});
