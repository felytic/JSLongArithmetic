/*jshint esversion: 6 */
//import LongNumber from "longArithmetic.js";
//import QUnit from "qunit.js";

QUnit.test('Creating long number', function(assert) {
    'use strict';
    var sample = {
sign: 0,
end: 0,
digits: {}
};
var checked = new LongNumber(0);
assert.propEqual(checked, sample, '0');

sample = {
sign: 0,
end: 0,
digits: {}
};
checked = new LongNumber(0.00000);
assert.propEqual(checked, sample, '0.00000');

sample = {
sign: -1,
end: 2,
digits: [2, 1]
};

sample = {
sign: 0,
      end: 0,
      digits: {}
};
checked = new LongNumber('000000');
assert.propEqual(checked, sample, '000000');

sample = {
sign: 1,
      begin: 0,
      end: 0,
      digits: {0: 1}
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
  assert.equal(checked.toString(), sample + '0000000000', sample + '0000000000');
}
});
/*
   QUnit.test('toString() test', function(assert) {
   'use strict';
   assert.equal((new LongNumber(0)).toString(), '0', '0');
   assert.equal((new LongNumber('-0')).toString(), '0', '0');
   assert.equal((new LongNumber(1)).toString(), '1', '1');
   assert.equal((new LongNumber(-1)).toString(), '-1', '-1');
   });

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
 */
QUnit.test('Comparing two long numbers', function(assert) {
    assert.equal(LongNumber.compare(new LongNumber(0), new LongNumber(0)),
        0, '0 == 0 ');
    assert.equal(LongNumber.compare(new LongNumber(1),
          new LongNumber(1)), 0, '1 == 1 ');
    assert.equal(LongNumber.compare(new LongNumber(-1), 
          new LongNumber(-1)), 0, '-1 == -1 ');

    assert.equal(LongNumber.compare(new LongNumber(12.34),
          new LongNumber(12.34)), 0, '12.34 == 12.34 ');
    assert.equal(LongNumber.compare(new LongNumber(1e+2), 
          new LongNumber(100)), 0, '1e+2 == 100 ');
    assert.equal(LongNumber.compare(new LongNumber(-0), new LongNumber(0)), 0, '-0 == 0 ');

    assert.equal(LongNumber.compare(new LongNumber(1), new LongNumber(0)), 1, '1 > 0 ');
    assert.equal(LongNumber.compare(new LongNumber(1000), new LongNumber(100)), 1, '1000 > 100 ');
    assert.equal(LongNumber.compare(new LongNumber(1.00000000001), new LongNumber(1)), 1, '1.00000000001 > 1 ');
    assert.equal(LongNumber.compare(new LongNumber(87e-45), new LongNumber(87e-46)), 1, '87e-45 > 87e-46 ');

    assert.equal(LongNumber.compare(new LongNumber(0), new LongNumber(1)), -1, '0 < 1 ');
    assert.equal(LongNumber.compare(new LongNumber(100), new LongNumber(1000)), -1, '100 < 1000 ');
    assert.equal(LongNumber.compare(new LongNumber(1), new LongNumber(1.00000000001)), -1, '1 < 1.00000000001 ');
    assert.equal(LongNumber.compare(new LongNumber(87e-46), new LongNumber(87e-45)), -1, '87e-46 < 87e-45 ');

    assert.equal(LongNumber.compare(new LongNumber(0), new LongNumber(-1)), 1, '0 > -1 ');
    assert.equal(LongNumber.compare(new LongNumber(100), new LongNumber(-1000)), 1, '100 > -1000 ');
    assert.equal(LongNumber.compare(new LongNumber(1), new LongNumber(-1.00000000001)), 1, '1 > -1.00000000001 ');
    assert.equal(LongNumber.compare(new LongNumber(87e-46), new LongNumber(-87e-45)), 1, '87e-46 > -87e-45 ');

    assert.equal(LongNumber.compare(new LongNumber(-100), new LongNumber(-1000)), 1, '-100 > -1000 ');
    assert.equal(LongNumber.compare(new LongNumber(-1), new LongNumber(-1.00000000001)), 1, '-1 > -1.00000000001 ');
    assert.equal(LongNumber.compare(new LongNumber(-87e-46), new LongNumber(-87e-45)), 1, '-87e-46 >  -87e-45 ');
});

QUnit.test('Cloning LongNumber', function (assert){
    var a = new LongNumber(0);
    assert.propEqual(a, a.clone(), '0 = 0');

    for (let i = 0; i < 5; i++){
      var x = Math.random() * 100 - 50;
      var sample = new LongNumber(x);
      var checked = new LongNumber(x).clone();
      assert.propEqual( checked, sample, x + ' = ' + x ) 
    }
});

QUnit.test('Inverting LongNumber', function (assert){

    var a = new LongNumber(0);
    assert.propEqual(a, a.invert(), '0 = -0');
    assert.propEqual(a, a.invert().invert(), '0 = --0');

    for (let i = 0; i < 5; i++){
      var x = Math.random() * 100 - 50;
      var sample = new LongNumber(x);
      var checked = new LongNumber(-x).invert();
      assert.propEqual( checked, sample, x + ' = -' + x ) 
    }
});
QUnit.test('Adding long number', function(assert) {
    var sample = new LongNumber(0);
    var checked = LongNumber.add(new LongNumber(0), new LongNumber(0));
    assert.propEqual(checked, sample, '0 + 0 = 0 ');

    var sample = new LongNumber(1);
    var checked = LongNumber.add(new LongNumber(0), new LongNumber(1));
    assert.propEqual(checked, sample, '0 + 1 = 1 ');

    var sample = new LongNumber(1.23);
    var checked = LongNumber.add(new LongNumber(1.23), new LongNumber(0));
    assert.propEqual(checked, sample, '1.23 + 0 = 0 ');

    var sample = new LongNumber(5.79);
    var checked = LongNumber.add(new LongNumber(1.23), new LongNumber(4.56));
    assert.propEqual(checked, sample, '1.23 + 4.56 = 5.79 ');

    var sample = new LongNumber(1000);
    var checked = LongNumber.add(new LongNumber(999.9999), new LongNumber(0.0001));
    assert.propEqual(checked, sample, '999.9999 + 0.0001 = 1000');

    for (var i = 0; i < 10; i++) {
      var a = +String(Math.random() / 2).slice(0, 6);
      var b = +String(Math.random() / 2).slice(0, 6);
      var c = +(a + b).toPrecision(6);

      var sample = new LongNumber(c);
      var checked = LongNumber.add(new LongNumber(a), new LongNumber(b));
      assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
    }

    for (var i = 0; i < 10; i++) {
      var a = +String(Math.random() * 1000000).slice(0, 12);
      var b = +String(Math.random() * 1000000).slice(0, 12);
      var c = +(a + b).toPrecision(13);

      var sample = new LongNumber(c);
      var checked = LongNumber.add(new LongNumber(a), new LongNumber(b));
      assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
    }


    for (var i = 0; i < 10; i++) {
      var a = -Math.floor(Math.random() * Math.pow(10, 10));
      var b = -Math.floor(Math.random() * Math.pow(10, 10));
      var c = a + b;

      var sample = new LongNumber(c);
      var checked = LongNumber.add(new LongNumber(a), new LongNumber(b));
      assert.propEqual(checked, sample, a + ' + ' + b + ' = ' + c);
    }

});

QUnit.test('Incrementing number', function(assert) {

    var checked = new LongNumber(0);
    var sample = new LongNumber(1);
    assert.propEqual(checked.add(new LongNumber(1)), sample, '0 += 1 == 1');

    checked = new LongNumber(1);
    sample = new LongNumber(2);
    assert.propEqual(checked.add(new LongNumber(1)), sample, '1 += 1 == 2');

    checked = new LongNumber(1.234);
    sample = new LongNumber(2.234);
    assert.propEqual(checked.add(new LongNumber(1)), sample, 
        '1.234 += 1 == 2.234');

    checked = new LongNumber(999.9999);
    sample = new LongNumber(1000);
    assert.propEqual(checked.add(new LongNumber(0.0001)), sample, 
        '999.9999 += 0.0001 == 1000');

    checked = new LongNumber('14e+70');
    sample = new LongNumber('1400023e+65');
    assert.propEqual(checked.add(new LongNumber('23e+65')), sample, 
        '14e+70 += 23e+65 == 1400023e+65');

    for (let i = 0; i < 10; i++) {
      let a = +String(Math.random() / 2).slice(0, 6);
      let b = +String(Math.random() / 2).slice(0, 6);
      let c = +(a + b).toPrecision(6);

      sample = new LongNumber(c);
      checked = new LongNumber(a);
      assert.propEqual(checked.add(new LongNumber(b)), sample, 
          a + ' =+ ' + b + ' = ' + c);
    }

    for (let i = 0; i < 10; i++) {
      let a = +String(Math.random() * 1000000).slice(0, 12);
      let b = +String(Math.random() * 1000000).slice(0, 12);
      let c = +(a + b).toPrecision(13);

      sample = new LongNumber(c);
      checked = new LongNumber(a);
      assert.propEqual(checked.add(new LongNumber(b)), sample,
          a + ' =+ ' + b + ' = ' + c);
    }


    for (let i = 0; i < 10; i++) {
      let a = -Math.floor(Math.random() * Math.pow(10, 10));
      let b = -Math.floor(Math.random() * Math.pow(10, 10));
      let c = a + b;

      sample = new LongNumber(c);
      checked = new LongNumber(a);
      assert.propEqual(checked.add(new LongNumber(b)), sample, 
          a + ' =+ ' + b + ' = ' + c);
    }
});

/*QUnit.test('Adding speed test', function(assert){
    var a = Math.abs(Math.random());
    var e1 = Math.floor(Math.random() * 100) - 50;
    var longA = new LongNumber(a + 'e' + e1);
    for (let i = 0; i < 500000; i++){  
    var e2 = Math.floor(Math.random() * 100) - 50;
    var b = Math.abs(Math.random());
    longA.add(new LongNumber(b + 'e' + e2));

    }

    assert.equal(true, true, '500000 tests');
    });
*/
