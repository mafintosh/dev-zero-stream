var stream = require('readable-stream')
var inherits = require('inherits')

var BLANK = new Buffer(65536)
BLANK.fill(0)

module.exports = ZeroStream

function ZeroStream (length) {
  if (!(this instanceof ZeroStream)) return new ZeroStream(length)
  this.remaining = typeof length === 'number'
    ? length
    : Infinity
  stream.Readable.call(this)
}

inherits(ZeroStream, stream.Readable)

ZeroStream.prototype._read = function () {
  if (this.destroyed) return

  if (this.remaining >= BLANK.length) {
    this.remaining -= BLANK.length
    this.push(BLANK)
  } else if (this.remaining) {
    var last = BLANK.slice(0, this.remaining)
    this.remaining = 0
    this.push(last)
  } else {
    this.push(null)
  }
}

ZeroStream.prototype.destroy = function (err) {
  this.destroyed = true
  if (err) this.emit('error', err)
  this.emit('close')
}
