# dev-zero-stream

Stream just returns blank buffers. Like reading from /dev/zero on Unix.

```
npm install dev-zero-stream
```

[![build status](http://img.shields.io/travis/mafintosh/dev-zero-stream.svg?style=flat)](http://travis-ci.org/mafintosh/dev-zero-stream)

## Usage

``` js
var zero = require('dev-zero-stream')
var fs = require('fs')

var stream = zero(50 * 1024 * 1024) // 50mb of blank data
stream.pipe(fs.createWriteStream('/tmp/test.blank'))
```

You can also create an infinite blank stream

``` js
var stream = zero()

stream.on('data', function (data) {
  // will never stop firing
  console.log('data:', data)
})
```

## API

#### `var stream = zero(length)`

Create a new blank stream. Length can be set to the byte length of the stream.
If not provided the stream will have an infinite length.

## License

MIT
