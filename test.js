var zero = require('./')
var concat = require('concat-stream')
var tape = require('tape')

tape('is blank data', function (t) {
  zero(111111).pipe(concat(function (data) {
    var blank = new Buffer(111111)
    blank.fill(0)
    t.same(data, blank)
    t.end()
  }))
})

tape('is blank data (same as internal buffer)', function (t) {
  zero(65536).pipe(concat(function (data) {
    var blank = new Buffer(65536)
    blank.fill(0)
    t.same(data, blank)
    t.end()
  }))
})

tape('can be infinite', function (t) {
  var inf = zero()
  var tick = 1000

  inf.on('data', function () {
    tick--
    if (!tick) inf.destroy()
  })

  inf.on('close', function () {
    t.pass('emitted 1000 buffers and was destroyed')
    t.end()
  })
})
