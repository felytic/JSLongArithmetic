QUnit.test('Creating long number', function(assert) {
  var sample = {
    sign: 0,
    begin: 0,
    end: 0,
    numbers: {}
  };
  var checked = new LongNumber(0);
  assert.propEqual(checked, sample, '0');

  sample = {
    sign: 1,
    begin: 0,
    end: 0,
    numbers: {
      '0': 1
    }
  };
  checked = new LongNumber(1);
  assert.propEqual(checked, sample, '1');

  sample = {
    sign: -1,
    begin: -100,
    end: -101,
    numbers: {
      '-100': 8,
      '-101': 7,
    }
  };
  checked = new LongNumber(-8.7e-100);
  assert.propEqual(checked, sample, '-8.7e-100');

  var sample = {
    sign: 1,
    numbers: {
      '4': 7,
      '-83': 2,
      '-84': 3,
    },
    begin: 4,
    end: -84
  };
  var checked = new LongNumber('70000.000000000000000000000000000000000000000000000000000000000000000000000000000000000023');
  assert.propEqual(checked, sample, '70000.000000000000000000000000000000000000000000000000000000000000000000000000000000000023');

  sample = {
    sign: 1,
    begin: 3,
    end: 3,
    numbers: {
      3: 1
    }
  };
  checked = new LongNumber(1000);
  assert.propEqual(checked, sample, '1000');

  sample = {
    sign: 1,
    begin: 19,
    end: 4,
    numbers: {
      19: 8,
      18: 1,
      17: 9,
      16: 4,
      15: 1,
      14: 7,
      13: 6,
      9: 5,
      8: 4,
      7: 2,
      6: 9,
      5: 3,
      4: 8
    }
  };
  checked = new LongNumber(81941760005429380000);
  assert.propEqual(checked, sample, '81941760005429380000');
});

QUnit.test('Adding long number', function(assert) {
  var sample = new LongNumber(0);
  var checked = longAdd(new LongNumber(0), new LongNumber(0));
  assert.propEqual(sample, checked, '0 + 0 = 0 ');

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
    '-10000': 7,
  };
  var c = new LongNumber('1e+10001');
  c.end = -10000;
  c.numbers = {
    '10001': 1,
    '10000': 7,
    '9999': 6,
    '-9999': 1,
    '-10000': 4,
  };
  var sample = c;
  var checked = longAdd(a, a);
  assert.propEqual(checked, sample, a + ' + ' + a + ' = ' + c);

});
