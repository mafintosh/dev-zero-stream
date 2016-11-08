var zero = require('./')
var fs = require('fs')

var stream = zero(50 * 1024 * 1024)

stream.pipe(fs.createWriteStream('/tmp/test.blank'))
